---
title: "Testing page for multiple CSS parameters"
subtitle: "Normal roman text"
links:
  - name: Demo
    url: /
date: "2017-09-10 12:24:56+01:00"
mirrors:
  - name: dev.to
    url: https://dev.to/
  - name: Medium
    url: https://medium.com/
discussions:
  - name: Hacker News
    url: https://news.ycombinator.com/
  - name: Reddit
    url: https://reddit.com/
knowledge:
  - HTML5
  - Javascript
  - CSS
tags:
  - article
  - essay
---

# Heading 1
# {{< anchor link="#heading-1" >}}Heading 1 {#heading-1}

Normal roman text. __Bold text.__ _Italic text._ **_Bold Italic Text._** &#@$%.

## Heading 2
## {{< anchor link="#heading-2" >}}Heading 2 {#heading-2}

Normal roman text. __Bold text.__ _Italic text._ **_Bold Italic Text._** &#@$%.

### Heading 3
### {{< anchor link="#heading-3" >}}Heading 3 {#heading-3}

Normal roman text. __Bold text.__ _Italic text._ **_Bold Italic Text._** &#@$%.

#### Heading 4
#### {{< anchor link="#heading-4" >}}Heading 4 {#heading-4}

Normal roman text. __Bold text.__ _Italic text._ **_Bold Italic Text._** &#@$%.

##### Heading 5
##### {{< anchor link="#heading-5" >}}Heading 5 {#heading-5}

Normal roman text. __Bold text.__ _Italic text._ **_Bold Italic Text._** &#@$%.

###### Heading 6
###### {{< anchor link="#heading-6" >}}Heading 6 {#heading-6}

Normal roman text. __Bold text.__ _Italic text._ **_Bold Italic Text._** &#@$%.


# Reference

Additionally, the represented data is normalized[^test] within an adjustable
scale. This can be used to filter out extremely high or extremely low samples,
uniforming the remaining data and improving its visibility.

[^test]: Footnote example.


# Ligatures [link](https://www.edduarte.com)

ff fi fl ffi ffl fk fh ft

__ff fi fl ffi ffl fk fh ft__

_ff fi fl ffi ffl fk fh ft_

**_ff fi fl ffi ffl fk fh ft_**


# Details

<details>
  <summary><strong>Contributing</strong></summary>
  <div>
    <p>Pull requests and stars are always welcome.</p>
    <details>
      <summary><strong>Inner 1</strong></summary>
      <div>
        <p>For bugs and feature requests, <a href="/jonschlinkert/gulp-htmlmin/issues/new">please create an issue</a>.</p>
      </div>
    </details>
    <details>
      <summary><strong>Inner 2</strong></summary>
      <div>
      <p>Don't forget to like and subscribe!</p>
        <details>
          <summary><strong>Inner-Inner 1</strong></summary>
          <div>
            <p>I didn't :angryface:</p>
          </div>
        </details>
      </div>
    </details>
  </div>
</details>


# Images

{{< figure
  src="/posts/living-globe/screenshot-01.png"
  alt="Current prototype of Living Globe" >}}
Current prototype of Living Globe, showing population growth mapped to the
bars/pilars height, total life expectancy at birth to bar color, and birth/death
ratio to country color.
{{</ figure >}}

# Line length

{{< dropcap >}}

To help me visualize the length of the line <span style="color:red;">(</span>as
demonstrating in this para<span style="color:red;">g</span>raph), I mark the
letter at 45 and 75 characters (including spaces), then drop in a span class in
both places.

And now I want to visualize the length of the line by marking the 70t<span
style="color:red;">h</span> cha<span style="color:red;">r</span>acte<span
style="color:red;">r</span>, the 75th character and the 80th character.

# International characters

普通の日本語のテキスト. __太字.__ _イタリック体._ **_太字のイ._**

нормальный русский текст. __жирный текст.__ _курсивный текст._
**_жирный курсивный текст._**

# Code

everyone ``loves`` a code ``example``, but how about a code ``that is
multi-line`` ?

# Code snippet

```java
public class RawReader extends BaseReader {

  public RawReader() {
    try {
      Nfa nfa = new Nfa(".+", action);
      setNFA(nfa, DfaRun.UNMATCHED_COPY);
    } catch (ReSyntaxException ex) {
      throw new NejiException(ex);
    }
  }

  private AbstractFaAction action = new AbstractFaAction() {
    public static void invoke(StringBuffer text, int start, DfaRun runner) {
      StringBuilder sb = new StringBuilder();
      sb.append("<roi>");

      String s = XMLParsing.solveXMLEscapingProblems(text.toString());
      String unescapedText = StringEscapeUtils.unescapeXml(s);
      unescapedText = unescapedText.replaceAll("\n", "</roi>\n<roi>");

      sb.append(unescapedText);
      sb.append("</roi>");
      text.replace(start, text.length(), sb.toString());
    }
  };

}
```

# Quote

> Ability is nothing without opportunity.
Quote: Napoleon Bonaparte --
