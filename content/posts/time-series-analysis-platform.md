---
title: "Distributed and scalable platform for collaborative analysis of massive
time series data sets"
subtitles:
  publication: "Proceedings of the 8th International Conference on Data Science,
  Technology and Applications"
  talk: "DATA 2019, July 26-28, Vienna House Diplomat, Prague, Czech Republic"
description: "High-consistency distributed system and reactive web app that
allows researchers to annotate time series patterns while preventing data loss
from overlapping contributions or unsanctioned changes."
keywords: [time series, annotations, annotation systems, collaborative software,
data analysis, information science, data modeling, knowledge management,
database management systems, distributed systems, information visualization,
collaborative software, HVAC, backend, REST, REST API, RESTful, Java, Spring
Boot 2, Spring AOP, JPA, Jackson, Hibernate 5, Hibernate Envers, PostgreSQL,
InfluxDB, Docker, Docker Swarm, Dropwizard Metrics, Jersey, Redis, JWT, JSON,
JSON Web Token, jjwt, Spring Security, RabbitMQ, AssertJ, Micrometer, Ant
Design, Axios, Dygraphs, React, ReactJS, Redux, TypeScript, Mocha, Webpack,
LESS, PostCSS, Puppeteer]
lang: [Java, TypeScript]
tech: [Spring Boot 2, ReactJS, Redux, PostgreSQL, InfluxDB, Redis]
parents:
  - master-thesis
authors:
  - name: Ed Duarte
    url: https://www.edduarte.com
  - name: Diogo Gomes
    url: https://diogogomes.com/
  - name: David Campos
    url: http://davidcampos.org/
  - name: Rui L. Aguiar
    url: https://www.it.pt/Members/Index/357
papers:
  - name: SciTePress
    url: https://www.scitepress.org/PublicationsDetail.aspx?ID=duVELBh/osY=&t=1
slides:
  - name: Notist
    url: https://noti.st/duarte/CAP51Y
  - name: as PDF
    url: /posts/time-series-platform/DATA2019-21-slides-v10.pdf
date: "2019-07-28 11:32:00+01:00"
types:
  - project
  - publication
  - talk
subsections:
  - conference-paper
  - full-stack
---

The recent expansion of metrification on a daily basis has led to the
production of massive quantities of data, which in many cases correspond to
time series. To streamline the discovery and sharing of meaningful information
within time series, a multitude of analysis software tools were developed.
However, these tools lack appropriate mechanisms to handle massive time series
data sets and large quantities of simultaneous requests, as well as suitable
visual representations for annotated data.

In this paper we propose a distributed, scalable, secure and high-performant
architecture that allows a group of researchers to curate a mutual knowledge
base deployed over a network and to annotate patterns while preventing data
loss from overlapping contributions or unsanctioned changes. Analysts can share
annotation projects with peers over a reactive web interface with a
customizable workspace. Annotations can express meaning not only over a segment
of time but also over a subset of the series that coexist in the same segment.
In order to reduce visual clutter and improve readability, we propose a novel
visual encoding where annotations are rendered as arcs traced only over the
affected curves. The performance of the prototype under different architectural
approaches was benchmarked.


{{< line >}}

## Publication

This research paper was published in _Proceedings of the 8th International
Conference on Data Science, Technology and Applications_, volume 1, pages
41-52. The full text can be read on
[SciTePress](https://www.scitepress.org/PublicationsDetail.aspx?ID=duVELBh/osY=&t=1).

To cite this paper, you may use the following BibTex record:

```bibtex
@conference{EdDuarte/data2019/time-series-analysis-platform,
  author = {Eduardo Duarte and Diogo Gomes and David Campos and Rui L. Aguiar},
  title = {Distributed and scalable platform for collaborative analysis of massive time series data sets},
  booktitle = {Proceedings of the 8th International Conference on Data Science, Technology and Applications - Volume 1: DATA},
  pages = {41--52},
  year = {2019},
  publisher = {SciTePress},
  organization = {INSTICC},
  doi = {10.5220/0007834700410052},
  isbn = {978-989-758-377-3},
}
```


{{< line >}}

## Talk

The paper described in this page was presented on the 27th of July 2019 at the
[DATA 2019: International Conference on Data Science, E-learning and Information
Systems](http://www.dataconference.org) in Prague, Czech Republic. Below are the
slides (with speaker notes) used for that presentation, which are also [hosted
on Notist](https://noti.st/duarte/CAP51Y).


{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-1.jpg"
  alt="Slide 1" 
>}}
{{</ figure >}}



{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-2.jpg"
  alt="Slide 2"
>}}
## Introduction
- metrification of devices;
  - e.g. wearable gadgets, real-time IoT sensors, Smart Home devices
- annual data acquisition rate:
  - 2016 – 1.2 zb/y;
  - 2021 – 3.3 zb/y;
- requirements for digital data processing and storage are increasing
  exponentially;
- Volume, Variety and Velocity;
- <u>Value</u> and <u>Veracity</u>.
{{</ figure >}}

- In the last few years we have been in the presence of the phenomenon of
  increased metrification;
- How to derive meaning from huge amounts of complex raw data while it
  continues to grow every day? The answer: collaborative (human or automated)
  analysis;
- Analysis is more agile when done within a software solution, especially when
  collaborators work in a shared network, evolving a mutual knowledgebase
  without physical presence.



{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-3.jpg"
  alt="Slide 3"
>}}
## Introduction: Time series analysis
- some metrics only have meaning when observed as a pattern over time;
- time series can be found in almost every aspect of human life;
- most domains produce massive amounts of series data;
- analysis is more agile when within a software solution.

Fig. 1: Three time series represented in a line graph visualization.
{{</ figure >}}

- Example domains with massive time series data sets: medical diagnosis using
  EEGs and ECGs, financial technical analysis, monitoring of natural
  phenomenons, athlete performance monitoring;
- Analysis methodologies have to handle data entropy at storage and visual
  levels.



{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-4.jpg"
  alt="Slide 4"
>}}
## Introduction: Time series visualization
- can be a very challenging task:
  - data sets commonly have high cardinality and complexity;
- <u>comparative visualization tasks</u>:
  - dashboard applications like Timelion, Grafana and Freeboard;
- most analysis applications are built as web applications.

Fig. 2: Grafana and Timelion (Kibana) dashboards displaying multiple time
series charts in simultaneous.
{{</ figure >}}

- In highly heterogeneous use cases, there is a need to compare data from
  different measurements and source devices;
- Why web apps? Because of recent developments made to web technologies and the
  near-universal availability of browsers;
- Time series alone cannot convey meaning, only allude to it.



{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-5.jpg"
  alt="Slide 5"
>}}
## Introduction: Annotation
- realistic analysis tasks involve collaboration and knowledge-sharing between
  human curators;
- annotations facilitate knowledge-building and decision-making in analysis
  processes.

Fig. 3: Annotation encoding in Grafana
{{</ figure >}}

- Annotations allow collaborators to critique, create memory-aids, highlight
  patterns, and circumventing rigid records by adding meta-data that was not
  originally envisioned by the creators of the input data set;
- Annotations in time series are commonly associated ONLY with segments of
  time, occupying the full vertical area in the chart;
- Because of this, annotations cannot visually relate to a subset of the
  visible series in a chart, but rather to all of them.



{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-6.jpg"
  alt="Slide 6"
>}}
## Proposal
- data-intensive architecture and web application for collaborative time series
  analysis;
- use most appropriate open-source tools for querying, storing and displaying
  time series and annotations;
- distributed architecture to handle high quantities of concurrent usage:
  - E+C for annotations, users and the knowledge base;
  - E+L for series.
- prototype tested with HVAC data set from 1000 boilers over 1.3 years.
{{</ figure >}}

- The problem: current solutions do not handle realistic scenarios of analysis
  very well (massive data sets = too slow, unintuitive visualization);
- Additional features include versioning, user management and authentication;
- Focus on consistency for the ontology and availability for the series;
- Prototype is completely domain-agnostic.



{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-7.jpg"
  alt="Slide 7"
>}}
## Proposal: Data model
- time series has a measurement and a data source;
- annotations have a parent type, a point or ranged segment of time, and <u>a
  set of affected series</u>;
- projects restrict a set of collaborators to a segment of time, a set of
  series, and an annotation scope.

Fig. 4: Relational diagram of entities
{{</ figure >}}

- Time series are uniquely identified by source-measurement pairs;
- Annotation types enforce a common dictionary to catalog the annotations, one
  that is shared by all projects;
- Annotations explicitly mapping a set of series is one of the main
  differentiators of our model;
- All entities are versioned.



{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-8.jpg"
  alt="Slide 8"
>}}
## Proposal: Data management
- polyglot persistence model:
  - time series are stored in InfluxDB, ontology is stored in PostgreSQL;
  - central backend enforces data access logic and conceals the real location
    of the data.

Fig. 5: Data management approach
{{</ figure >}}

- InfluxDB was the best candidate for queries and long-term storage of massive
  time series data sets (due to rollups that summarize data optimized by
  timestamp);
- InfluxDB has a more limited data model for data that is not series, so
  another database was required;
- A relational database was better a better fit for the ontology because most
  queries required (all or part of the) related entities;
- PostgreSQL was the best candidate for the ontology due to its highly
  consistent and ACID-compliant MVCC model;
- The central backend acts as a stateless broker.



{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-9.jpg"
  alt="Slide 9"
>}}
## Proposal: Data management
- overall traffic workload is distributed, but querying simultaneous data types
  can lead to bottlenecks;
- links are added on each data point and propagated to the TSDBMS on ontology
  updates.

Fig. 6: Data management approach with ad-hoc entity links on each time series
data point
{{</ figure >}}

- Example of a query that could lead to a bottleneck: querying series (on
  InfluxDB) by their annotations, types or projects (on PostgreSQL) would
  require a request to PostgreSQL so that these results (which include
  annotation’s affected series) could be used to request InfluxDB;
- These ad-hoc links are eventually-consistent: updating an annotation’s
  affected series with the annotation links takes some time (inconsistency
  window), so querying during that time will return obsolete results;
- So why not place all of the data in PostgreSQL, allowing series to fetch
  associated annotations through joins? See “Evaluation” slide.



{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-10.jpg"
  alt="Slide 10"
>}}
## Proposal: Architecture
Fig. 7: Platform architecture
{{</ figure >}}

- User sends requests to frontend on the left (or to the REST API directly) ->
  eventually arrives at the relevant databases on the right;
- Cache: remember the result of expensive queries (e.g. computing annotation’s
  and their types between a start and an end timestamp) to speed up the
  following calls.



{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-11.jpg"
  alt="Slide 11"
>}}
## Proposal: Architecture
Fig. 8: Platform architecture highlighting a RabbitMQ queue between the backend
and InfluxDB
{{</ figure >}}

- InfluxDB does not have transactions with atomic writes, and overlapping
  update propagations can lead to data loss;
- This is fixed with a FIFO queue (only for writes, reads are not queued) ->
  eventually consistent writes (they already were, but the inconsistency window
  is increased).



{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-12.jpg"
  alt="Slide 12"
>}}
## Proposal: Architecture
Fig. 9: Load-balancing strategy
{{</ figure >}}

- The backend is replicated;
- Load balancer is the only entry point;
- A load balancer cannot queue requests on its own, so it would keep
  redirecting requests even if all replicas are under strain;
- The distributed queue allows requests to be queued when all backend replicas
  are under strain (and if more cannot be spawned on-the-fly).



{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-13.jpg"
  alt="Slide 13"
>}}
## Proposal: Architecture
- the backend opens processing pipelines for each request;
- authentication:
  - auth. session tokens are JWTs with an expiration date;
- validation stage checks for invalid contents or constraint violations.

Fig. 10: Processing pipeline for queries and insertions
{{</ figure >}}

For an annotation A, a parent annotation-type T, a parent project P, a
measurement M, and a source-measurement pair SM that combines any source with
M, the relationship constraints that must be validated are as follows:

- P allows T, both being parents of A;
- A is annotating SM, which P is querying;
- A is annotating SM, hence is annotating M, which T allows;
- A is annotating a type of time segment (point or region) that T allows.

The respective corollaries (in the case of removal operations) are:

- P cannot revoke T if at least one of A is still of type T;
- P cannot revoke SM if at least one of its child A is still annotating SM;
- T cannot revoke M if at least one of its child A is still annotating SM,
  hence annotating M;
- T cannot revoke a type of time segment (point or region) if at least one of
  its child A is set with it.



{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-14.jpg"
  alt="Slide 14"
>}}
## Proposal: Architecture
- updates, deletions and rollbacks are made asynchronously:
  - user receives a simulated snapshot with proposed changes;
  - validation stage ensures that the update will likely be committed;
  - caveat: unexpected errors cannot be sent to the user.

Fig. 11: Processing pipeline for updates, deletions or rollbacks
{{</ figure >}}

Another caveat: this opens an inconsistency window at the local level of the
requesting user (between they receive the simulated snapshot and until the
actual changes are committed to the database). This does **NOT** affect the
actual system nor the other users.



{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-15.jpg"
  alt="Slide 15"
>}}
## Proposal: Architecture
- users make changes based on the observed data;
- if two users update the same record at the same time -> race condition!!!;
- optimistic-locking: last-modified dates checksum.

Fig. 12: Processing pipeline for updates, deletions or rollbacks, with an arrow
pointing to the location of the two optimistic-locking checks
{{</ figure >}}

- The race condition here means that the ordering of events affects the
  knowledge-base’s correctness;
- The last atomically received write will overlap the previous one, and
  although the overlapped variant is versioned and can be recovered, the users
  are not properly notified of this;
- Users must always send the local last-modified date of the edited entity on
  update requests;
- If the check fails, the user is reading obsolete data and should manually
  refresh to merge;
- This check should not be done solely at the backend level, as simultaneous
  operations could still overlap on the database;
- Therefore, the second check occurs at the transactional level (atomic, so
  it’s not possible to query a “limbo” state in which the check is made and the
  entity is updated);
- The first check is just to make sure we don’t waste our time doing
  validations if the last-modified date is already obsolete.



{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-16.jpg"
  alt="Slide 16"
>}}
## Proposal: Architecture
- Spring JPA provides abstraction layers for PostgreSQL queries (hot-swap)

Fig. 13: Controller to Service to Repository association
{{</ figure >}}

- Separation of Concerns: one repository, one service and one controller for
  each of the entities in our data model;
- Series queries use a structured object (serialized in JSON) -> query objects
  follow a deterministic schema that is parseable and that can be constructed
  using query-builder UIs.



{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-17.jpg"
  alt="Slide 17"
>}}
## Proposal: Annotations
- snakes: arcs traced over series’ curves;
- paint over existing points, interpolate when in-between;
- intersection handling (nesting).

Fig. 14: Visual encoding of annotations
{{</ figure >}}

- On left: annotations intersect in the same segment of time, but not over the
  same series;
- On right: annotations intersect in both segment of time and series;
- Width adjustment to keep both snakes (inner and outer) clickable.



{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-18.jpg"
  alt="Slide 18"
>}}
{{</ figure >}}


{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-19.jpg"
  alt="Slide 19"
>}}
## Evaluation: Time series in PostgreSQL
- as granularity increases, Consistency is harder to attain;
- put all data in a single ACID-compliant RDBMS:
  - linking logic is built-in through the relational model;
  - better Consistency handling.
- benchmark read-write performance.

Fig. 15: The two data management approaches that were tested
{{</ figure >}}

The end goal is to recognize either an improvement or a negligible drop: if
PostgreSQL has an inconsequentially lower performance, it is still worth using
it for series for the possible gains (higher system consistency).



{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-20.jpg"
  alt="Slide 20"
>}}
## Evaluation: Time series in PostgreSQL
Fig. 16: Average CPU usage and request time observed for queries
{{</ figure >}}

- Blue lines are PostgreSQL, Purple lines are InfluxDB;
- For smaller data sets, performance differences are negligible;
- For larger data sets, estimated time and resource usage increase
  exponentially.



{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-21.jpg"
  alt="Slide 21"
>}}
## Evaluation: Time series in PostgreSQL
Fig. 17: Average request time, disk usage and RAM usage for insertions
{{</ figure >}}

- InfluxDB has better data ingestion rate and data compression (more scalable);
- however, InfluxDB uses more RAM (to store rollups).



{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-22.jpg"
  alt="Slide 22"
>}}
## Conclusion
- improved collaboration workflow:
  - enhanced model for building smaller scopes of analysis;
  - better visualization for comparison of data;
  - stronger annotation readability and flexibility of expression;
  - scalable architecture that adjusts to data set size and traffic amount;
  - linearizability and strongly validated contributions;
- the open REST API enables extensibility: more input and output modules can be
  added.
{{</ figure >}}

- The proposed platform enables stronger collaborative framework and eases the
  process of knowledge discovery/acquisition;
- Annotations occupy smaller areas of the vertical space, increasing
  intuitiveness and reducing visual noise;
- With this, we have a strong foundation to build stronger collaborative
  frameworks in other domains;
- Future Work: user permission granularity, multiple parent annotation types
  (behave like tags), database sharding, snake scrubbing to edit, bezier curves
  for series in line graphs, streamed transmission of query results
  (WebSocket).



{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-23.jpg"
  alt="Slide 23"
>}}
{{</ figure >}}


{{< line >}}

## Acknowledgements

The present study was developed in the scope of the Smart Green Homes Project
[POCI-01-0247-FEDER-007678], a co-promotion between Bosch Termotecnologia S.A.
and the University of Aveiro. It is financed by Portugal 2020 under the
Competitiveness and Internationalization Operational Program, and by the
European Regional Development Fund.


{{< footnotes >}}
{"list":[
"Abadi, D. (2012). Consistency tradeoffs in modern distributed database system design: Cap is only part of the story. Computer, 45(2):37–42.",
"Adnan, M., Just, M., and Baillie, L. (2016). Investigating time series visualisations to improve the user experience. In Proceedings of the 2016 CHI Conference on Human Factors in Computing Systems, CHI ’16, pages 5444–5455, New York, NY, USA. ACM.",
"Bader, A., Kopp, O., and Falkenthal, M. (2017). Survey and comparison of open source time series databases. In Mitschang, B., Nicklas, D., Leymann, F., Schning, H., Herschel, M., Teubner, J., Hrder, T., Kopp, O., and Wieland, M., editors, Datenbanksysteme fr Business, Technologie und Web (BTW 2017) - Workshopband, pages 249–268, Bonn. Gesellschaft fr Informatik e.V.",
"Bar-Or, A., Healey, J., Kontothanassis, L., and Thong, J. M. V. (2004). Biostream: a system architecture for real-time processing of physiological signals. In The 26th Annual International Conference of the IEEE Engineering in Medicine and Biology Society, volume 2, pages 3101–3104.",
"Blount, M., Ebling, M., Eklund, J., James, A., Mcgregor, C., Percival, N., Smith, K., and Sow, D. (2010). Real-time analysis for intensive care: Development and deployment of the artemis analytic system. IEEE Engineering in Medicine and Biology Magazine, 29(2):110–118.",
"Cleveland, W. S. and McGill, R. (1984). Graphical perception: Theory, experimentation, and application to the development of graphical methods. Journal of the American Statistical Association, 79(387):531–554.",
"Eltabakh, M. Y., Aref, W. G., Elmagarmid, A. K., Ouzzani, M., and Silva, Y. N. (2009). Supporting annotations on relations. In Proceedings of the 12th International Conference on Extending Database Technology: Advances in Database Technology, EDBT ’09, pages 379–390, New York, NY, USA. ACM.",
"Fielding, R. (2000). Representational state transfer. Architectural Styles and the Design of Netowork-based Software Architecture, pages 76–85.",
"Freedman, M. (2018). Timescaledb vs. influxdb: purpose built differently for time-series data.",
"Fu, T.-c. (2011). A review on time series data mining. Engineering Applications of Artificial Intelligence, 24(1):164 – 181.",
"Gilbert, S. and Lynch, N. (2002). Brewer’s conjecture and the feasibility of consistent, available, partitiontolerant web services. SIGACT News, 33(2):51–59.",
"Guyet, T., Garbay, C., and Dojat, M. (2007). Knowledge construction from time series data using a collaborative exploration system. Journal of Biomedical Informatics, 40(6):672 – 687. Intelligent Data Analysis in Biomedicine.",
"Hadavandi, E., Shavandi, H., and Ghanbari, A. (2010). Integration of genetic fuzzy systems and artificial neural networks for stock price forecasting. KnowledgeBased Systems, 23(8):800 – 808.",
"Hampton, L. (2018). Eye or the tiger: Benchmarking cassandra vs. timescaledb for time-series data.",
"Healy, P. D., O’Reilly, R. D., Boylan, G. B., and Morrison, J. P. (2010). Web-based remote monitoring of live eeg. In The 12th IEEE International Conference on e-Health Networking, Applications and Services, pages 169–174.",
"Healy, P. D., O’Reilly, R. D., Boylan, G. B., and Morrison, J. P. (2011). Interactive annotations to support collaborative analysis of streaming physiological data. In 2011 24th International Symposium on ComputerBased Medical Systems (CBMS), pages 1–5.",
"Hochheiser, H. and Shneiderman, B. (2004). Dynamic query tools for time series data sets: Timebox widgets for interactive exploration. Information Visualization, 3(1):1–18.",
"Jensen, S. K., Pedersen, T. B., and Thomsen, C. (2017). Time series management systems: A survey. IEEE Transactions on Knowledge and Data Engineering, 29(11):2581–2600.",
"Kalogeropoulos, D. A., Carson, E. R., and Collinson, P. O. (2003). Towards knowledge-based systems in clinical practice: Development of an integrated clinical information and knowledge management support system. Computer Methods and Programs in Biomedicine, 72(1):65 – 80.",
"Keim, D. A., Mansmann, F., Schneidewind, J., and Ziegler, H. (2006). Challenges in visual data analysis. In Tenth International Conference on Information Visualisation (IV’06), pages 9–16.",
"Keraron, Y., Bernard, A., and Bachimont, B. (2009). Annotations to improve theusing and the updating of digital technical publications. 20:157–170.",
"Kiefer, R. (2017). Timescaledb vs. postgres for time-series: 20x higher inserts, 2000x faster deletes, 1.2x-14,000x faster queries.",
"Kreps, J. (2013). The log: What every software engineer should know about real-time data’s unifying abstraction.",
"Laney, D. (2001). 3d data management: Controlling data volume, variety and velocity.",
"Liang, J. and Huang, M. L. (2010). Highlighting in information visualization: A survey. In 2010 14th International Conference Information Visualisation, pages 79–85.",
"Mathe, Z., Haen, C., and Stagni, F. (2017). Monitoring performance of a highly distributed and complex computing infrastructure in lhcb. In Journal of Physics: Conference Series, volume 898, page 092028. IOP Publishing.",
"Momjian, B. (2018). Mvcc unmasked.",
"ONeil, P., Cheng, E., Gawlick, D., and ONeil, E. (1996). The log-structured merge-tree (lsm-tree). Acta Informatica, 33(4):351–385.",
"O’Reilly, R. D. (2015). A distributed architecture for the monitoring and analysis of time series data.",
"Pressly, Jr., W. B. S. (2008). Tspad: A tablet-pc based application for annotation and collaboration on time series data. In Proceedings of the 46th Annual Southeast Regional Conference on XX, ACM-SE 46, pages 527– 528, New York, NY, USA. ACM.",
"Sow, D., Biem, A., Blount, M., Ebling, M., and Verscheure, O. (2010). Body sensor data processing using stream computing. In Proceedings of the International Conference on Multimedia Information Retrieval, MIR ’10, pages 449–458, New York, NY, USA. ACM."
]}
{{</ footnotes >}}

