---
title: "Living Globe: Tridimensional interactive visualization of world demographic data"
subtitle: "HCI International 2016, The Westin Harbour Castle Hotel, Toronto, Canada"
description: "Open-source WebGL app for tri-dimensional worldwide data
visualization, with customizable data-to-visual mapping and filtering with
adjustable scales."
authors:
    - Eduardo Duarte
    - Pedro Bordonhos
    - Paulo Dias
    - Beatriz Sousa Santos
authorUrls:
    - https://www.edduarte.com
    - 
    - http://sweet.ua.pt/paulo.dias/
    - http://sweet.ua.pt/bss/
links:
    - Demo
    - Source code
    - Paper (Springer)
    - Paper (arXiv)
    - Slides (PDF)
    - Slides (SlideShare)
linkUrls:
    - https://edduarte.github.io/living-globe
    - https://github.com/edduarte/living-globe
    - https://link.springer.com/chapter/10.1007%2F978-3-319-40349-6_2
    - https://arxiv.org/abs/1607.05946
    - /hcii2016/slides.pdf
    - http://www.slideshare.net/EduardoDuarte33/hcii2016slides-v3
date: '2016-06-21 19:58:00+01:00'
medium: "https://medium.com/@edduarte/living-globe-tridimensional-interactive-
visualization-of-world-demographic-data-c3eeb1845c51"
type: paper
slug: living-globe
aliases:
    - living-globe
    - livingglobe
---

Living Globe is a WebGL application for tri-dimensional worldwide data
visualization. It allows the simultaneous representation of multiple indicators
as spatial structures (bars and other objects located in a specific latitude-longitude
on the globe). The mapping of data to the provided visual structures
is configurable by the user, introducing an aspect of customization which
encourages a more immediate, visual-only interpretation of the data.
Additionally, the represented data is normalized within an adjustable scale.
This can be used to filter out extremely high or extremely low samples,
uniforming the remaining data and improving its visibility.

<figure>
<img class="js-lazy-image"
    src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
    data-src="/hcii2016/screenshot-1-compressed.png"
    alt="Current prototype of Living Globe"/>
<noscript>
<img 
    src="/hcii2016/screenshot-1-compressed.png"
    alt="Current prototype of Living Globe"/>
</noscript>

<figcaption>Current prototype of Living Globe, showing population growth mapped
to the bars/pilars height, total life expectancy at birth to bar color, and
birth/death ratio to country color.</figcaption>

</figure>

Our prototype was developed with demographic data in mind, like total
population, density, population-growth, life expectancy, net migration, crude
birth rate, crude death rate and the ratio between the last two. However, today
it actually allows the visual exploration of the any kind of numerical data
structured in JSON by year and by country. We provide two example input files:
“input.json” (containing demographic data between the years 1960 and 2014) and
“input_alt.json” (containing miscellaneous data regarding finance, demography
and employment between the years 1960 and 2014).

While offering inexperienced users a default mapping of these data variables
into visual variables, Living Globe allows more advanced users to select the
mapping they intent to use. This means that these users have the possibility of
control over an earlier stage of the visualization reference model (Riccardo
Mazza. Introduction to information visualization. Springer-Verlag London, 1,
2009) making Living Globe a more flexible tool.

In order to support this feature, three visual variables may be selected to map
a data type: i) height of vertical bars (directly proportional to the data
value) ii) color of vertical bars (in a color scale ranging from blue to
yellow) and iii) color of the countries on the globe (in a scale ranging from
red to green). An adequate selection of the data variables and their mapping to
the visual variables may help the identification and study of potential
relations among data variables. The time interval may be selected using a
slider.

Living Globe also offers the following functionality: i) textual search, with
dynamic suggestion of the countries names; ii) country selection; and iii)
configuration of minimum and maximum data values; This last feature, which
filters out countries that do not match the minimum and maximum values and
normalizes the remaining data set, can potentially lead to improvements in the
interpretation of data in countries with small samples (eg. Portugal) by
filtering out countries with large samples (e.g. China).

<figure>
<img class="js-lazy-image"
    src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
    data-src="/hcii2016/screenshot-2-compressed.png"
    alt="Demonstration of Living Globe when using the filtering feature with
    data normalization"/>
<noscript>
<img 
    src="/hcii2016/screenshot-2-compressed.png"
    alt="Demonstration of Living Globe when using the filtering feature with
    data normalization"/>
</noscript>

<figcaption>Living Globe showing total population mapped to the country color:
the data from all countries is displayed on the left, and filtering out large
population countries (such as China and India) on the right (resulting in a
representation with much more diverse and distinguishing colors for the
remaining countries)</figcaption>

</figure>

Finally, the usability of this tool was tested by agnostic individuals, and the
results indicate that the data filtering and customizable mapping features
encourage a faster interpretation of relational information.
