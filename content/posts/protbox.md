---
title: "Protbox: Secure and trustworthy file sharing over cloud storage using
eID tokens"
description: "Open-source & cross-platform app that performs file encryption
and user authentication on existing cloud storage services."
keywords: [information security, cloud storage, file encryption, authentication,
eID token, dropbox, onedrive, google drive, sugarsync]
authors:
  - name: Ed Duarte
    url: https://www.edduarte.com
  - name: Filipe Pinheiro
    url: 
  - name: André Zúquete
    url: http://sweet.ua.pt/andre.zuquete/public_html/
  - name: Hélder Gomes
    url: http://wiki.ieeta.pt/wiki/index.php/Hélder_Gomes
links:
  - name: Download app
    url: https://github.com/edduarte/protbox/releases/tag/3.0.2
  - name: Source code
    icon: github
    url: https://github.com/edduarte/protbox
  - name: Paper on LNI
    icon: paper
    url: http://subs.emis.de/LNI/Proceedings/Proceedings237/article15.html
  - name: Paper on arXiv
    icon: paper
    url: http://arxiv.org/abs/1501.03139
  - name: Talk slides as PDF
    icon: slides
    url: /posts/protbox/slides.pdf
  - name: Talk slides on Speaker Deck
    icon: slides
    url: https://speakerdeck.com/edduarte/secure-and-trustworthy-file-sharing-over-cloud-storage-using-eid-tokens
date: "2014-11-05 11:03:00+01:00"
tags:
  - project
  - paper
  - talk
---

Protbox is an open-source, cross-platform application for securely sharing files
within existing cloud storage services like Dropbox, OneDrive, Google Drive and
SugarSync.

- confidentiality, to prevent non-authorized readings;
- integrity control, to detect malicious tampering;
- protection against un-wanted file removals, either by malicious or legitimate
  persons;
- access control to the shared data based on strong identification and
  authentication of people, using the nowadays widespread electronic, personal
  identity tokens (eIDs for short).

{{< figure
  src="/posts/protbox/screenshot_main.png"
  alt="Protbox desktop application" >}}
Protbox desktop application running in the background, protecting two shared
folders from Dropbox.
{{</ figure >}}

Although similar solutions already exist, these tend to require all keys to be
stored on a centralized database owned by the service provider, and hence the
necessary data required for access to the shared files has to be granted to a
third-party service. With Protbox, the key distribution between peers is done by
leveraging special files that are exchanged through the exact same cloud storage
space that is used for file sharing, thus no extra services are required other
than the trustworthy national PKIs (Public Key Infrastructures) used to validate
eID signatures. The files exposed to others by means of cloud sharing are
completely protected from malicious or involuntary tampering.

Protbox randomly generates and uses a key per folder to protect all its
contents, including files and sub-directories. Files are encrypted with AES and
their integrity is ensured with HMAC-SHA1. Encrypted file names, which contain
bytes that are not acceptable for naming files in existing file systems, are
coded in a modified Base64 alphabet, which should work in most file systems.

The application is [fully open-source](https://github.com/edduarte/protbox), and
can be [freely
downloaded](https://github.com/edduarte/protbox/releases/tag/3.0.2). It works
with any operating system with a suitable Java Runtime Environment. The
application also features a graphical user interface for dealing with key
distribution requests, which was designed to be similar to the Dropbox user
interface in order to be accessible to common Dropbox users.

There are only two requirements for the host cloud storage solution: it should
allow the sharing of folders by many persons, and it should allow client
operating systems to have a local mount point of the shared folder. In other
words, Protbox is already compatible with the most widely used cloud storage
applications out-of-the-box.


## Publication

A research paper describing the architecture of Protbox, titled **_Secure and
trustworthy file sharing over cloud storage using eID tokens_**, was published
in _Lecture Notes in Informatics (LNI), Proceedings - Series of the Gesellschaft
fur Informatik (GI)_, volume P-237, pages 73-84. This paper can be read on
[LNI](http://subs.emis.de/LNI/Proceedings/Proceedings237/article15.html) or
[arXiv](http://arxiv.org/abs/1501.03139).


## Talk

The paper and desktop application described in this page were presented at [Open
Identity Summit 2014](https://go.eid.as/summit/) in Fraunhofer IAO Institute
Center, Stuttgart, Germany. Below are the slides used for that presentation,
[hosted on Speaker
Deck](https://speakerdeck.com/edduarte/secure-and-trustworthy-file-sharing-over-cloud-storage-using-eid-tokens).

{{< sd 18f78dd7b1cf493aaf7b817d76f36383 >}}

