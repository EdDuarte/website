---
title: "Distributed and scalable platform for collaborative analysis of massive
time series data sets"
subtitle: "DATA 2019, Prague, Czech Republic"
description: "High-performant architecture that allows researchers to annotate
time series patterns while preventing data loss from overlapping contributions
or unsanctioned changes."
keywords: [time series, annotations, annotation systems, collaborative
software, data analysis, information science, data modeling, knowledge
management, database management systems, distributed systems, information
visualization, collaborative software, HVAC]
authors:
  - name: Ed Duarte
    url: https://www.edduarte.com
  - name: Diogo Gomes
    url: https://diogogomes.com/
  - name: David Campos
    url: http://davidcampos.org/
  - name: Rui L. Aguiar
    url: https://www.it.pt/Members/Index/357
links:
  - name: Talk slides as PDF
    icon: slides
    url: /posts/time-series-platform/DATA2019-21-slides-v10.pdf
  - name: Talk slides on Notist
    icon: slides
    url: https://noti.st/duarte/CAP51Y/slides
date: "2019-07-28 11:32:00+01:00"
tags:
  - paper
  - talk
---

The recent expansion of metrification on a daily basis has led to the
production of massive quantities of data, which in many cases correspond to
time series. To streamline the discovery and sharing of meaningful information
within time series, a multitude of analysis software tools were developed.
However, these tools lack appropriate mechanisms to handle massive time series
data sets and large quantities of simultaneous requests, as well as suitable
visual representations for annotated data. We propose a distributed, scalable,
secure and high-performant architecture that allows a group of researchers to
curate a mutual knowledge base deployed over a network and to annotate patterns
while preventing data loss from overlapping contributions or unsanctioned
changes. Analysts can share annotation projects with peers over a reactive web
interface with a customizable workspace. Annotations can express meaning not
only over a segment of time but also over a subset of the series that coexist
in the same segment. In order to reduce visual clutter and improve readability,
we propose a novel visual encoding where annotations are rendered as arcs
traced only over the affected curves. The performance of the prototype under
different architectural approaches was benchmarked.


## Acknowledgements

The present study was developed in the scope of the Smart Green Homes Project
[POCI-01-0247-FEDER-007678], a co-promotion between Bosch Termotecnologia S.A.
and the University of Aveiro. It is financed by Portugal 2020 under the
Competitiveness and Internationalization Operational Program, and by the
European Regional Development Fund.


## Publication

This research paper was published in _8th International Conference on Data
Science, Technology and Applications: Proceedings_. Links to this paper will be
included once available.


## Talk

The paper described in this page was presented at the [DATA 2019: International
Conference on Data Science, E-learning and Information
Systems](http://www.dataconference.org) in Vienna House Diplomat Prague,
Prague, Czech Republic. Below are the slides used for that presentation,
[hosted on Notist](https://noti.st/duarte/CAP51Y/slides).

{{< notist "duarte/CAP51Y" >}}

