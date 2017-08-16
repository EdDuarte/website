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
    - https://edduarte.com
    - 
    - http://sweet.ua.pt/paulo.dias/
    - http://sweet.ua.pt/bss/
links:
    - Demo
    - Github
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
date: '2016-07-17'
medium: "https://medium.com/@edduarte/living-globe-tridimensional-interactive-
visualization-of-world-demographic-data-c3eeb1845c51"
slug: living-globe
---

[![Current prototype of Living Globe](/hcii2016/living-globe-v3-8.png)](https://edduarte.github.io/living-globe)

Living Globe is a WebGL application for tri-dimensional worldwide data
visualization. It allows the simultaneous representation of multiple indicators
as spatial structures (bars and other objects located in a specific latitude-
longitude on the globe). The mapping of data to the provided visual structures
is configurable by the user, introducing an aspect of customization which
encourages a more immediate, visual-only interpretation of the data.
Additionally, the represented data is normalized within an adjustable scale.
This can be used to filter out extremely high or extremely low samples,
uniforming the remaining data and improving its visibility.

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

The usability of this tool was tested by agnostic individuals, and the results
indicate that the data filtering and customizable mapping features encourage a
faster interpretation of relational information. Moreover, this tool improves
on previous state-of-the-art work by implementing interaction capabilities like
selection, search and filtering.

# Bibtex reference

E. Duarte, P. Bordonhos, P. Dias, B. S. Santos, *Living Globe: Tridimensional
   Interactive Visualization of World Demographic Data*

```
@Inbook{Duarte2016,
    author="Duarte, Eduardo and Bordonhos, Pedro and Dias, Paulo and Santos, Beatriz Sousa",
    editor="Yamamoto, Sakae",
    title="Living Globe: Tridimensional Interactive Visualization of World Demographic Data",
    bookTitle="Human Interface and the Management of Information:Information, Design and Interaction: 18th International Conference, HCI International 2016 Toronto, Canada, July 17-22, 2016, Proceedings, Part I",
    year="2016",
    publisher="Springer International Publishing",
    address="Cham",
    pages="14--24",
    isbn="978-3-319-40349-6",
    doi="10.1007/978-3-319-40349-6_2",
    url="http://dx.doi.org/10.1007/978-3-319-40349-6_2"
}
```

