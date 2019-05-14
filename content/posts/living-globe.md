---
title: "Living Globe: Tridimensional interactive visualization of world
demographic data"
description: "Open-source WebGL app for tri-dimensional worldwide data
visualization, with customizable data-to-visual mapping and filtering with
adjustable scales."
image: "/hcii2016/screenshot-01.png"
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
  - name: Open app
    url: https://edduarte.github.io/living-globe
  - name: Source code
    icon: github
    url: https://github.com/edduarte/living-globe
  - name: Paper on Springer
    icon: paper
    url: https://link.springer.com/chapter/10.1007%2F978-3-319-40349-6_2
  - name: Paper on arXiv
    icon: paper
    url: https://arxiv.org/abs/1607.05946
  - name: Talk slides as PDF
    icon: slides
    url: /hcii2016/slides.pdf
  - name: Talk slides on Speaker Deck
    icon: slides
    url: https://speakerdeck.com/edduarte/living-globe-tridimensional-interactive-visualization-of-world-demographic-data
date: "2016-06-21 19:58:00+01:00"
medium: "https://medium.com/@EdDuarte/living-globe-tridimensional-interactive-visualization-of-world-demographic-data-c3eeb1845c51"
markup: mmark
tags:
  - project
  - paper
  - talk
series:
#  - infovisproj
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
![Current prototype of Living Globe](# "Current prototype of Living Globe, showing population growth mapped to the bars/pilars height, total life expectancy at birth to bar color, and birth/death ratio to country color.")

<noscript>

![Current prototype of Living Globe](/hcii2016/screenshot-01.png "Current prototype of Living Globe, showing population growth mapped to the bars/pilars height, total life expectancy at birth to bar color, and birth/death ratio to country color.")

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
a data type:
- height of vertical bars (directly proportional to the data value);
- color of vertical bars (in a color scale ranging from blue to yellow);
- color of the countries on the globe (in a scale ranging from red to green).

An adequate selection of the data variables and their mapping to the visual
variables may help the identification and study of potential relations among
data variables. The time interval can be changed through a slider.

Living Globe also offers the following functionality: i) textual search, with
dynamic suggestion of the countries names; ii) country selection; and iii)
configuration of minimum and maximum data values; This last feature, which
filters out countries that do not match the minimum and maximum values and
normalizes the remaining data set, can potentially lead to improvements in the
interpretation of data in countries with small samples (eg. Portugal) by
filtering out countries with large samples (e.g. China).

{class="js-lazy-image" src="/hcii2016/screenshot-02-transparent.png"}
![Living Globe when using the filtering feature with data normalization](# 'Living Globe showing total population mapped to the country color: the data from all countries is displayed on the left, and filtering out large population countries \(such as China and India\) on the right \(resulting in a representation with much more diverse and distinguishable colors for the remaining countries\)')

<noscript>

![Living Globe when using the filtering feature with data normalization](/hcii2016/screenshot-02-transparent.png 'Living Globe showing total population mapped to the country color: the data from all countries is displayed on the left, and filtering out large population countries \(such as China and India\) on the right \(resulting in a representation with much more diverse and distinguishable colors for the remaining countries\)')

</noscript>

This application can be tested [here](https://edduarte.github.io/living-globe).
It is built with Javascript ES6, [jQuery](https://jquery.com/),
[three.js](https://threejs.org/) and
[chroma.js](https://gka.github.io/chroma.js/), and the codebase is open-sourced
[on Github](https://github.com/edduarte/living-globe).


## Publication

A research paper describing the implementation of Living Globe, titled **_Living
Globe: Tridimensional Interactive Visualization of World Demographic Data_**,
was published in _HIMI 2016: Human Interface and the Management of Information:
Information, Design and Interaction_, volume 9734, pages 14-24. This paper can
be read on
[Springer](https://link.springer.com/chapter/10.1007%2F978-3-319-40349-6_2) or
[arXiv](https://arxiv.org/abs/1607.05946).

Throughout research, the usability of this app was tested by agnostic
individuals, and the results indicate that the data filtering and customizable
mapping features encourage a faster interpretation of relational information.


## Talk

The paper and prototype described in this page were presented at the
[HCI International 2016](http://www.hci.international/) in The Westin Harbour
Castle Hotel, Toronto, Canada. It was originally presented in portuguese at
[SciTecIN 2015](https://scitecin.isr.uc.pt/index.php/pt/), University of
Coimbra, Portugal. Below are the slides used for those presentations, [hosted on
Speaker
Deck](https://speakerdeck.com/edduarte/living-globe-tridimensional-interactive-visualization-of-world-demographic-data).

{{< sd bf04a6e0d58a4dfaa7ce97e9c08c309b >}}

