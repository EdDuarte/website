---
title: "Living Globe: Tridimensional interactive visualization of world
demographic data"
prologue: "The paper and prototype described in this page were presented at the
HCI International 2016 in The Westin Harbour Castle Hotel, Toronto, Canada. It
was originally presented in portuguese at SciTecIN 2015, University of Coimbra,
Portugal."
description: "Open-source WebGL app for tri-dimensional worldwide data
visualization, with customizable data-to-visual mapping and filtering with
adjustable scales"
authors:
  - name: Ed Duarte
    url: https://www.edduarte.com
  - name: Pedro Bordonhos
    url: 
  - name: Paulo Dias
    url: http://sweet.ua.pt/paulo.dias/
  - name: Beatriz Sousa Santos
    url: http://sweet.ua.pt/bss/
links:
  - name: Demo
    url: https://edduarte.github.io/living-globe
  - name: Source code
    url: https://github.com/edduarte/living-globe
  - name: Paper (Springer)
    url: https://link.springer.com/chapter/10.1007%2F978-3-319-40349-6_2
  - name: Paper (arXiv)
    url: https://arxiv.org/abs/1607.05946
  - name: Talk slides (PDF)
    url: /hcii2016/slides.pdf
date: "2016-06-21 19:58:00+01:00"
medium: "https://medium.com/@edduarte/living-globe-tridimensional-interactive-visualization-of-world-demographic-data-c3eeb1845c51"
type: paper
markup: mmark
---

Living Globe is a WebGL application for tri-dimensional worldwide data
visualization. It allows the simultaneous representation of multiple indicators
as spatial structures (bars and other objects located in a specific
latitude-longitude on the globe). The mapping of data to the provided visual
structures is configurable by the user, introducing an aspect of customization
which encourages a more immediate, visual-only interpretation of the data.
Additionally, the represented data is normalized within an adjustable scale.
This can be used to filter out extremely high or extremely low samples,
uniforming the remaining data and improving its visibility.

{class="js-lazy-image" src="/hcii2016/screenshot-01.png"}

![Current prototype of Living Globe](# 'Current prototype of Living Globe,
showing population growth mapped to the bars/pilars height, total life
expectancy at birth to bar color, and birth/death ratio to country color.')

<noscript>

![Current prototype of Living Globe](/hcii2016/screenshot-01.png 'Current
prototype of Living Globe, showing population growth mapped to the bars/pilars
height, total life expectancy at birth to bar color, and birth/death ratio to
country color.')

</noscript>

Our prototype was developed with demographic data in mind, like total
population, density, population-growth, life expectancy, net migration, crude
birth rate, crude death rate and the ratio between the last two. However, today
it actually allows the visual exploration of the any kind of numerical data
structured in JSON by year and by country. We provide two example input files:
"input.json" (containing demographic data between the years 1960 and 2014) and
"input_alt.json" (containing miscellaneous data regarding finance, demography
and employment between the years 1960 and 2014).

While offering inexperienced users a default mapping of these data variables
into visual variables, Living Globe allows more advanced users to select the
mapping they intend to use. This means that users can control over an earlier
stage of the visualization reference model (Riccardo Mazza. Introduction to
information visualization. Springer-Verlag London, 1, 2009) making Living Globe
a more flexible tool than other similar tools.

In order to support this feature, three visual variables may be selected to map
a data type: i) height of vertical bars (directly proportional to the data
value) ii) color of vertical bars (in a color scale ranging from blue to yellow)
and iii) color of the countries on the globe (in a scale ranging from red to
green). An adequate selection of the data variables and their mapping to the
visual variables may help the identification and study of potential relations
among data variables. The time interval may be selected using a slider.

Living Globe also offers the following functionality: i) textual search, with
dynamic suggestion of the countries names; ii) country selection; and iii)
configuration of minimum and maximum data values; This last feature, which
filters out countries that do not match the minimum and maximum values and
normalizes the remaining data set, can potentially lead to improvements in the
interpretation of data in countries with small samples (eg. Portugal) by
filtering out countries with large samples (e.g. China).

{class="js-lazy-image" src="/hcii2016/screenshot-02.png"}

![Demonstration of Living Globe when using the filtering feature with data
normalization](# 'Living Globe showing total population mapped to the country
color: the data from all countries is displayed on the left, and filtering out
large population countries \(such as China and India\) on the right \(resulting
in a representation with much more diverse and distinguishing colors for the
remaining countries\)')

<noscript>

![Demonstration of Living Globe when using the filtering feature with data
normalization](/hcii2016/screenshot-02.png 'Living Globe showing total
population mapped to the country color: the data from all countries is displayed
on the left, and filtering out large population countries \(such as China and
India\) on the right \(resulting in a representation with much more diverse and
distinguishing colors for the remaining countries\)')

</noscript>

Finally, the usability of this tool was tested by agnostic individuals, and the
results indicate that the data filtering and customizable mapping features
encourage a faster interpretation of relational information.

You may test this application [here](https://edduarte.github.io/living-globe).
It is fully open-source and [available on
Github](https://github.com/edduarte/living-globe), and was built with
Javascript ES6, jQuery, three.js and chroma.js.
