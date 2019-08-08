---
title: "Distributed and scalable platform for collaborative analysis of massive
time series data sets"
subtitle: "DATA 2019, July 26 - 28, Prague, Czech Republic"
description: "High-performant webapp that allows researchers to annotate time
series patterns while preventing data loss from overlapping contributions or
unsanctioned changes."
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

{{< dropcap >}}

The recent expansion of metrification on a daily basis has led to the
production of massive quantities of data, which in many cases correspond to
time series. To streamline the discovery and sharing of meaningful information
within time series, a multitude of analysis software tools were developed.
However, these tools lack appropriate mechanisms to handle massive time series
data sets and large quantities of simultaneous requests, as well as suitable
visual representations for annotated data. In this paper we propose a
distributed, scalable, secure and high-performant architecture that allows a
group of researchers to curate a mutual knowledge base deployed over a network
and to annotate patterns while preventing data loss from overlapping
contributions or unsanctioned changes. Analysts can share annotation projects
with peers over a reactive web interface with a customizable workspace.
Annotations can express meaning not only over a segment of time but also over a
subset of the series that coexist in the same segment. In order to reduce
visual clutter and improve readability, we propose a novel visual encoding
where annotations are rendered as arcs traced only over the affected curves.
The performance of the prototype under different architectural approaches was
benchmarked.


{{< line >}}

## Publication

This research paper was published in _8th International Conference on Data
Science, Technology and Applications: Proceedings_. Links to this paper will be
included once available.


{{< line >}}

## Talk

The paper described in this page was presented at the [DATA 2019: International
Conference on Data Science, E-learning and Information
Systems](http://www.dataconference.org) in Vienna House Diplomat Prague,
Prague, Czech Republic. Below are the slides (with speaker notes) used for that
presentation, which are also [hosted on
Notist](https://noti.st/duarte/CAP51Y/slides).

{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-1.jpg" alt="Slide 1"  >}}
{{</ figure >}}

{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-2.jpg" alt="Slide 2" >}}
  <ul><li>In the last few years we have been in the presence of the phenomenon of increased metrification;</li><li>How to derive meaning from huge amounts of complex raw data while it continues to grow every day? The answer: collaborative (human or automated) analysis;</li><li>Analysis is more agile when done within a software solution, especially when collaborators work in a shared network, evolving a mutual knowledgebase without physical presence.</li></ul>
{{</ figure >}}

{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-3.jpg" alt="Slide 3" >}}
  <ul><li>Example domains with massive time series data sets: medical diagnosis using EEGs and ECGs, financial technical analysis, monitoring of natural phenomenons, athlete performance monitoring;</li><li>Analysis methodologies have to handle data entropy at storage and visual levels.</li></ul>
{{</ figure >}}

{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-4.jpg" alt="Slide 4" >}}
  <ul><li>In highly heterogeneous use cases, there is a need to compare data from different measurements and source devices;</li><li>Why webapps? Because of recent developments made to web technologies and the near-universal availability of browsers.</li></ul>
{{</ figure >}}

{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-5.jpg" alt="Slide 5" >}}
  <ul><li>Time series alone cannot convey meaning, only allude to it;</li><li>Annotations allow collaborators to critique, create memory-aids, highlight patterns, and circumventing rigid records by adding meta-data that was not originally envisioned by the creators of the input data set;</li><li>Annotations in time series are commonly associated ONLY with segments of time, occupying the full vertical area in the chart;</li><li>Because of this, annotations cannot visually relate to a subset of the visible series in a chart, but rather to all of them.</li></ul>
{{</ figure >}}

{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-6.jpg" alt="Slide 6" >}}
  <ul><li>The problem: current solutions do not handle realistic scenarios of analysis very well (massive data sets = too slow, unintuitive visualization);</li><li>Additional features include versioning, user management and authentication;</li><li>Focus on consistency for the ontology and availability for the series; Prototype is completely domain-agnostic.</li></ul>
{{</ figure >}}

{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-7.jpg" alt="Slide 7" >}}
  <ul><li>Time series are uniquely identified by source-measurement pairs;</li><li>Annotation types enforce a common dictionary to catalog the annotations, one that is shared by all projects;</li><li>Annotations explicitly mapping a set of series is one of the main differentiators of our model;</li><li>All entities are versioned.</li></ul>
{{</ figure >}}

{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-8.jpg" alt="Slide 8" >}}
  <ul><li>InfluxDB was the best candidate for queries and long-term storage of massive time series data sets (due to rollups that summarize data optimized by timestamp);</li><li>InfluxDB has a more limited data model for data that is not series, so another database was required;</li><li>A relational database was better a better fit for the ontology because most queries required (all or part of the) related entities;</li><li>PostgreSQL was the best candidate for the ontology due to its highly consistent and ACID-compliant MVCC model;</li><li>The central backend acts as a stateless broker.</li></ul>
{{</ figure >}}

{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-9.jpg" alt="Slide 9" >}}
  <ul><li>Example of a query that could lead to a bottleneck: querying series (on InfluxDB) by their annotations, types or projects (on PostgreSQL) would require a request to PostgreSQL so that these results (which include annotation’s affected series) could be used to request InfluxDB;</li><li>These ad-hoc links are eventually-consistent: updating an annotation’s affected series with the annotation links takes some time (inconsistency window), so querying during that time will return obsolete results;</li><li>So why not place all of the data in PostgreSQL, allowing series to fetch associated annotations through joins? See “Evaluation” section.</li></ul>
{{</ figure >}}

{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-10.jpg" alt="Slide 10" >}}
  <ul><li>User sends requests to frontend on the left (or to the REST API directly) -&gt; eventually arrives at the relevant databases on the right;</li><li>Cache: remember the result of expensive queries (e.g. computing annotation’s and their types between a start and an end timestamp) to speed up the following calls.</li></ul>
{{</ figure >}}

{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-11.jpg" alt="Slide 11" >}}
  <ul><li>InfluxDB does not have transactions with atomic writes, and overlapping update propagations can lead to data loss;</li><li>This is fixed with a FIFO queue (only for writes, reads are not queued) -&gt; eventually consistent writes (they already were, but the inconsistency window is increased).</li></ul>
{{</ figure >}}

{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-12.jpg" alt="Slide 12" >}}
  <ul><li>The backend is replicated;</li><li>Load balancer is the only entry point;</li><li>A load balancer cannot queue requests on its own, so it would keep redirecting requests even if all replicas are under strain;</li><li>The distributed queue allows requests to be queued when all backend replicas are under strain (and if more cannot be spawned on-the-fly).</li></ul>
{{</ figure >}}

{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-13.jpg" alt="Slide 13" >}}
  <p>For an annotation A, a parent annotation-type T, a parent project P, a measurement M, and a source-measurement pair SM that combines any source with M, the relationship constraints that must be validated are as follows:</p><ul><li>P allows T, both being parents of A;</li><li>A is annotating SM, which P is querying;</li><li>A is annotating SM, hence is annotating M, which T allows;</li><li>A is annotating a type of time segment (point or region) that T allows.</li></ul><p>The respective corollaries (in the case of removal operations) are:</p><ul><li>P cannot revoke T if at least one of A is still of type T;</li><li>P cannot revoke SM if at least one of its child A is still annotating SM;</li><li>T cannot revoke M if at least one of its child A is still annotating SM, hence annotating M;</li><li>T cannot revoke a type of time segment (point or region) if at least one of its child A is set with it.</li></ul>
{{</ figure >}}

{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-14.jpg" alt="Slide 14" >}}
  <p>Another caveat: this opens an inconsistency window at the local level of the requesting user (between they receive the simulated snapshot and until the actual changes are committed to the database). This does NOT affect the actual system nor the other users.</p>
{{</ figure >}}

{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-15.jpg" alt="Slide 15" >}}
  <ul><li>The race condition here means that the ordering of events affects the knowledge-base’s correctness;</li><li>The last atomically received write will overlap the previous one, and although the overlapped variant is versioned and can be recovered, the users are not properly notified of this;</li><li>Users must always send the local last-modified date of the edited entity on update requests;</li><li>If the check fails, the user is reading obsolete data and should manually refresh to merge;</li><li>This check should not be done solely at the backend level, as simultaneous operations could still overlap on the database;</li><li>Therefore, the second check occurs at the transactional level (atomic, so it’s not possible to query a “limbo” state in which the check is made and the entity is updated);</li><li>The first check is just to make sure we don’t waste our time doing validations if the last-modified date is already obsolete.</li></ul>
{{</ figure >}}

{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-16.jpg" alt="Slide 16" >}}
  <ul><li>Separation of Concerns: one repository, one service and one controller for each of the entities in our data model;</li><li>Series queries use a structured object (serialized in JSON) -&gt; query objects follow a deterministic schema that is parseable and that can be constructed using query-builder UIs.</li></ul>
{{</ figure >}}

{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-17.jpg" alt="Slide 17" >}}
  <ul><li>On left: annotations intersect in the same segment of time, but not over the same series;</li><li>On right: annotations intersect in both segment of time and series;</li><li>Width adjustment to keep both snakes (inner and outer) clickable.</li></ul>
{{</ figure >}}

{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-18.jpg" alt="Slide 18" >}}
{{</ figure >}}

{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-19.jpg" alt="Slide 19" >}}
  <p>The end goal is to recognize either an improvement or a negligible drop: if PostgreSQL has an inconsequentially lower performance, it is still worth using it for series for the possible gains (higher system consistency).</p>
{{</ figure >}}

{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-20.jpg" alt="Slide 20" >}}
  <ul><li>Blue lines are PostgreSQL, Purple lines are InfluxDB;</li><li>For smaller data sets, performance differences are negligible;</li><li>For larger data sets, estimated time and resource usage increase exponentially.</li></ul>
{{</ figure >}}

{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-21.jpg" alt="Slide 21" >}}
  <ul><li>InfluxDB has better data ingestion rate and data compression (more scalable);</li><li>InfluxDB uses more RAM (to store rollups).</li></ul>
{{</ figure >}}

{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-22.jpg" alt="Slide 22" >}}
  <ul><li>The proposed platform enables stronger collaborative framework and eases the process of knowledge discovery/acquisition;</li><li>Annotations occupy smaller areas of the vertical space, increasing intuitiveness and reducing visual noise;</li><li>With this, we have a strong foundation to build stronger collaborative frameworks in other domains;</li><li>Future Work: user permission granularity, multiple parent annotation types (behave like tags), database sharding, snake scrubbing to edit, bezier curves for series in line graphs, streamed transmission of query results (WebSocket).</li></ul>
{{</ figure >}}

{{< figure
  src="/posts/time-series-platform/slides/data2019-slide-23.jpg" alt="Slide 23" >}}
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
"Blount, M., Ebling, M., Eklund, J., James, A., Mcgregor, C., Percival, N., Smith, K., and Sow, D. (2010). Real-time analysis for intensive care: Development and deployment of the artemis analytic system. IEEEEngineeringinMedicineandBiologyMagazine, 29(2):110–118.",
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

