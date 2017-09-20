---
title: "Vokter, a Java library that detects and notifies changes in web
documents"
description: "High-performant library that uses LSH, DiffMatchPatch and Bloom
filters to detect and notify textual changes in web documents."
date: "2016-06-19 19:26:00+01:00"
medium: "https://medium.com/@edduarte/vokter-a-java-library-that-detects-
changes-in-web-documents-c4d3d399046d"
type: project
markup: mmark
---

What started as a simple project called Argus (from [*Argus
Panoptes*](https://en.wikipedia.org/wiki/Argus_Panoptes), the all-seeing giant
from Greek mythology) for a University class in Distributed Architecture, it is
currently my most ambitious and complex open-source library, now known as
Vokter (Norwegian for *watcher*).

[Vokter](https://github.com/vokter/vokter) is a high-performance, scalable
library that combines [Locality-Sensitive Hashing for
K-Shingles](https://github.com/edduarte/near-neighbor-search), [a fork of
DiffMatchPatch](https://github.com/edduarte/indexed-diff-match-patch), [Bloom
filters](https://github.com/google/guava/wiki/HashingExplained#bloomfilter) and
[Quartz jobs](http://www.quartz-scheduler.org) to detect changes in web
documents, triggering notifications when specified keywords were either added
or removed.

At a basic level, Vokter fetches web documents on a periodic basis and performs
**detection** (comparison of occurrences between two snapshots of the same
document) and **matching** (finding out if one of the detected differences
matches a registered keyword, sending messages to attached consumers if so).

It optionally supports multi-language stopword filtering, to ignore changes in
common words with no important significance, and
[stemming](http://snowball.tartarus.org/) to detect changes in lexical
variants. Appropriate stopword filtering and stemming algorithms are picked
based on the inferred language of the document, using a [N-grams Naïve Bayesian
classifier](https://github.com/optimaize/language-detector).

# Job Management{{< anchor link="#jobs" >}}{#jobs}

There are two types of jobs, concurrently executed and scheduled periodically
(using Quartz Scheduler): detection jobs and matching jobs.

The detection job is responsible for fetching a new document and comparing it
with the previous document, detecting textual differences between the two. To
do that, the robust DiffMatchPatch algorithm is used.

The matching job is responsible for querying the list of detected differences
with specific requested keywords.

Harmonization of keywords-to-differences is performed by using a Bloom filter,
removing differences that have a very low chance of containing the specified
keywords, before using a exact comparator (character-by-character) on the
remaining differences, to ensure that the detected changes contains any of the
keywords.

Since the logic of difference retrieval is spread between two jobs, one that is
agnostic of requests and one that is specific to the client and its keywords,
Vokter reduces workload by scheduling only one detection job per watched
webpage. For this, jobs are grouped into clusters, where its unique identifier
is the document URL. This means that each cluster imperatively contains a
single scheduled detection job and one or more matching jobs. In other words,
When two clients watch the same page, only one detection job for that page is
active.

# Scaling{{< anchor link="#scaling" >}}{#scaling}

Vokter was conceived to be able to scale and to be future-proof, and to this
effect it was implemented to deal with a high number of jobs in terms of
batching and persistence.

The clustering design mentioned above implies that, as the number of clients
grows linearly, the detection logic remains independent of the clients and is
only executed at a given set of triggers.

In terms of orchestration, there are two mechanisms created to reduce redundant
resource-consumption, both in memory as well as in the database:

1. if the difference detection job fails to fetch content from a specific URL
   after 10 consecutive attempts, the entire cluster for that URL is expired.
   When expiring a cluster, all of the associated client REST APIs receive a
   time-out call;
2. every time a matching job is canceled by its client, Vokter checks if there
   are still matching-jobs in its cluster, and if not, the cluster is cleared
   from the workspace.

# Persistence{{< anchor link="#persistence" >}}{#persistence}

Documents, indexing results, found differences are all stored in MongoDB. To
avoid multiple bulk operations on the database, every query (document, tokens,
occurrences and differences) is covered by memory cache with an expiry duration
between 20 seconds and 1 minute.

Persistence of detection and matching jobs is also covered, using a custom
MongoDB Job Store by Michael Klishin and Alex Petrov.

# OSGi-based architecture{{< anchor link="#osgi" >}}{#osgi}

Vokter support for reading of a given ``MediaType`` is provided by Reader
modules, where raw content is converted into a clean string filtered of non-
informative data (e.g. XML tags). These modules are loaded in a OSGi-based
architecture, meaning that compiled Reader classes can be loaded or unloaded
without requiring a reboot. When needed, usually when reading a new document or
snapshot, Vokter will query for available Readers by ``Content-Type``
supported.

This same plugin-like architecture is implemented for Stemmer modules. Using a
language detection prediction model, Vokter determines the most probable
language of the document and queries on-demand for available Stemmers by
language supported.

# Indexing{{< anchor link="#indexing" >}}{#indexing}

The string of text that represents the document snapshot that was captured
during the Reading phase is passed through a parser that tokenizes, filters
stop-words and stems text. For every token found, its occurrences (positional
index, starting character index and ending character index) in the document are
stored. When a detected difference affected a token, the character indexes of
its occurrences can be used to retrieve snippets of text. With this, Vokter can
instantly show to user, along with the notifications of differences detected,
the added text in the new snapshot or the removed text in the previous
snapshot.

Because different documents can have different languages, which require
specialized stemmers and stop-word filters to be used, the language must be
obtained. Unlike the ``Content-Type``, which is often provided as a HTTP header
when fetching the document, the ``Accept-Language`` is not for the most part.
Instead, Vokter infers the language from the document content using a language
detector algorithm based on Bayesian probabilistic models and N-Grams,
developed by Nakatani Shuyo, Fabian Kessler, Francois Roland and Robert Theis.

To ensure a concurrent architecture, where multiple parsing calls should be
performed in parallel, Vokter will instance multiple parsers when deployed and
store them in a blocking queue. The number of parsers corresponds to the number
of cores available in the machine where Vokter was deployed to.

# Caveats / Future Work{{< anchor link="#caveats" >}}{#caveats}

Despite every part of its architecture having been optimized to accommodate to
a massive amount of parallel tasks, Vokter has only been used in a academic
environment and has yet to be battle-tested in high-usage consumer software. If
you're using Vokter in your projects, let me know! 😀

Regardless, there is always room for improvement, and I feel that there are
currently two main issues that should be addressed with higher priority:<br/>1)
web crawling functionality; and 2) timeout of jobs when clients are missing.

## Web crawling{{< anchor link="#web-crawling" >}}{#web-crawling}

One way to improve user experience is by integrating web crawling in Reader
modules, allowing users to set their visit policy (e.g. number of nested
documents accessed). Within the current architecture where there is a unique
detection job per document, detection jobs must be sorted by link hierarchy.

Let's imagine an example where a job 1 watches document A and a job 2 watches
document B, where A has a link to B. In this case, job 2 does not need to exist
as there would be redundancy of detection jobs and index storage for document
B. Instead, job 1 should trigger clients linked to A and B:

- when differences are detected in A, only clients of A are notified;
- when differences are detected in B, both clients of A & B are notified.

This implies a more optimized architecture that has the potential of
significantly reducing the total number of simultaneous jobs.

## Fault-tolerance and timeout of matching jobs{{< anchor link="#fault-tolerance" >}}{#fault-tolerance}

Only detection jobs can be timed-out after failing too many times to load a new
snapshot of the document. However, sending a response to the client can fail
too, and currently there is no fault-tolerant way to deprecate matching jobs
when the client has 'disappeared and lost interest'. If a client fails to
receive the data, maybe because the client itself has been shutdown before
canceling its jobs from Vokter, then a potential high number of active
detection and matching jobs are gonna stay unnecessarily active.
