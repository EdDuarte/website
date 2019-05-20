---
title: "Developing a knowledge-based system for Texas Hold'em outcome
prediction in Erlang"
description: "Implementing a decision-tree classifier and a data management
module to evaluate win-lose probabilities over the course of a Poker Texas
Hold'em game."
links:
  - name: Source code
    icon: github
    url: https://github.com/edduarte/erlang-poker-ml
date: "2015-03-31 17:25:00+01:00"
medium: "https://medium.com/@EdDuarte/developing-a-knowledge-management-system-for-texas-holdem-outcome-prediction-in-erlang-cf3440ab806b"
markup: mmark
tags:
  - article
  - project
series:
  - dmproj
---

For a University class project we were asked to implement a decision-tree
classifier and to use a rule engine in order to develop a recommender system for
hands and outcomes in Poker Texas Hold'em matches. An additional challenge to
this was to make it in a functional language like Erlang, where no variable
state is persisted in memory for long periods of time. Instead, the objective
was to use a rule engine more-or-less like a disk database. All of the
historical data collected over time is sent between functions in a stateless
manner and persisted to disk using the rule engine.

With this, I developed a [Erlang application](https://github.com/edduarte
/erlang-poker-ml) with a CLI interface that collects game data and sends win-
lose percentages on each round. It works by prompting the user to fill the card
in his/her hand and table for each round, and whenever the user won or lost each
match. The probabilities of occurrence for each card per round, along with the
probability of winning or losing the match with the current cards, are
recalculated at the end of every match and organized into a Decision tree. Each
round the probability of getting a good hand and win the match is queried from
the Decision tree and printed to the user, suggesting him to either raise, call
or fold.

The application is fully open-source and only uses a single file ('poker.erl').
A trained model containing an history of matches and hands is also provided
('storage' file), so you can start testing the application immediately.

This application is composed of three modules:

- a main module, which uses [Eresye](http://sourceforge.net/projects/eresye/) to
  store Texas Hold'em rules and hand rankings;
- a history module, which stores the number of occurrences and the ranking of
  hands;
- a tree module, that implements the decision tree and the probability
  calculation methods.


## {{< anchor link="#preliminaries" >}}Preliminaries {#preliminaries}

A match is considered a result of seven cards that showed up throughout four
rounds. The four rounds are numbered from 0 to 3:

- Round 0: when the user is given 2 cards
- Round 1: when the first, second and third cards on the table are shown
- Round 2: when the fourth card on the table is shown
- Round 3: when the fifth card on the table is shown

We consider that it is only possible to either raise, call or fold between the
four rounds. Hence, there are three phases of betting. In this implementation draws are
ignored, so as to not influence the collected probabilities of winning or losing
by reducing the sample data of both.

A **rank** is a weight of importance associated with a specific set of cards.
These ranks are, in order: 1. Royal Flush; 2. Straight Flush; 3. Four Of A
Kind; 4. Full House; 5. Flush; 6. Straight; 7. Three Of A Kind; 8. Two Pair; 9.
Pair; 10. High Card.


## {{< anchor link="#main" >}}Main module {#main}

The main module uses the rule-based engine Eresye to store variables per match
and Texas Hold'em hand rankings. For each match, the user is prompted to input:

- the 7 cards that are visible to the user;
- the current pot value;
- the final result of the game ('won' or 'lost').

Some additional inputs can be used at any time:

- "reset": discards the current match inputs and starts again from round 0;
- "close": saves the current history data into a local file 'storage' and closes
  the application.

The current match data is only committed to history at the end of the match, so
a "reset" will discard the current match.

When prompting for a card, two inputs are required: the suit and the value.
Cards are then structured as {card, ID, Suit, Value} and compared with other
hands (and their ranks) in Eresye. The ID value is randomly attributed using the
method ``random:uniform()``, and is used to ensure that the card will not be
compared with itself during Eresye's operations.

{{< sidenote >}}
**Review note (May 20, 2019):** In retrospective, using the result of
random:uniform() as an ID is a bad idea, as it can lead to collisions (even
if they are rare). An unique UUID or a counting integer should have been used
instead.
{{</ sidenote >}}


## {{< anchor link="#decision-tree" >}}Decision tree module {#decision-tree}

The decision tree module implements a Decision tree where each node corresponds
to a round, and each round has 3 branches pointing to 3 child nodes. Each branch
and node stores, respectively:

- branch1 - Expected profit on Raise; node1 - Raise value
- branch2 - Expected profit on Fold; node2 - Fold value
- branch3 - Expected profit on Call; node3 - Call value

Because the probability of winning (*PWin*) varies according to the user's hand
and the current round, this decision tree is built at the end of each round, and
the expected profits are calculated as such:

`$$ExpectedProfitRaise = \left(Pot + RaiseValue\right) * PWin$$`

`$$ExpectedProfitFold = -\left(BetsDoneByPlayer\right)$$`

`$$ExpectedProfitCall = Pot * PWin$$`

*BetsDoneByPlayer* is the total value of bets done by the user to that point, or
in other words, the number of chips the user placed in the pot.

*PWin* can be calculated using the History module and its Bayesian network (see
below), where we can obtain the number of wins attained with the current hand,
but also the possible hands that can be obtained in future rounds knowing the
current hand. Assuming that:
- *c* is the **current hand**;
- *x* is a **possible hand in the next round**;
- *t* is the **total number of matches** recorded in history;
- function *W* is the **number of historic wins** for a specific hand;

Then *PWin* can be obtained using the following expression:

`$$P(c) = \frac{W(c)}{t} = \sum_{x=1}^{\infty} \left ( \frac{ W(x) }{t} + P
\left ( x | c \right ) \right )$$`

Once all of the expected profits are calculated, the action that the user should
take corresponds to the one that has the higher expected profit.



## {{< anchor link="#history" >}}History module {#history}

The history module is a data history, implemented using an alternative Eresye
engine (different from the one used in the main module). Essentially, using
Eresye allows the usage of insertion and query within a single variable that
does not need to be passed along functions, something that would otherwise be
impossible to do in native Erlang. In addition, the query implementation of
Eresye enables the retrieval of tuples without knowing all of its data, using
the wildcard '_' (underscore).

The data in storage is structured as:

- ``{round_no, current_rank, previous_round_rank, occurrence_count}``: the
  number of times the user had a ranked hand Y knowing that he/she had a ranked
  hand X on a previous hand (where Rank(Y) >= Rank(X));

- ``{won/lost, current_rank, occurrence_count}``: the number of times the user
  won or lost with a specific ranked hand;

- ``{total, total_matches_count}``: the total number of matches that were played
  with the application.

Note that the above data-types are identified by the first constant, so in
practice we will have 7 data-types (4 for each of the four rounds, 2 for won or
lost hands, and 1 for total matches count).

By storing the history on the local file 'storage', we have a continually
trained model, persistent between different application sessions. The prediction
of outcomes is based on conditional probabilities per round. For example, for
the following match...

- Round 0 = High Card
- Round 1 = Pair
- Round 2 = Pair
- Round 3 = Two Pair

... where *Total* is the total number of matches stored in history and where the
asterisk is a wildcard, the conditional probability for each round is
calculated as follows:

Round 0:

`$$P(Pair | HighCard) = \frac{query(round1, pair, highCard, *)}{Total}$$`

Round 1:

`$$P(Pair | Pair) = \frac{query(round2, pair, pair, *)}{Total}$$`

Round 2:

`$$P(TwoPair | Pair) = \frac{query(round3, twoPair, pair, *)}{Total}$$`

This lets us know if the chance to get other more valuable ranks is high enough
for it to be worth a raise or a call.

## {{< anchor link="#final" >}}Final thoughts {#final}

That's all! With all these modules, our knowledge management system for Texas
Hold'em outcome prediction is complete! In a way, we used Eresye to store state,
essentially getting around the functional and immutable nature of Erlang. There
might have been better ways to keep the statelessness by passing the complete
records around every function, but regardless, the decision-tree classifier is
completely stateless and, surprisingly, highly readable and maintainable.

Give it a go! And as always - feel free to [get in
touch](mailto:hi@edduarte.com).


<script defer src="/js/math-code.js"></script>
<script defer src="//cdn.bootcss.com/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML"></script>
