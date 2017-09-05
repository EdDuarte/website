---
title: "Secure and trustworthy file sharing over cloud storage using eID
tokens"
subtitle: "Open Identity Summit 2014, Fraunhofer IAO Institute Center,
Stuttgart, Germany"
description: "Open-source & cross-platform app that performs file encryption
and user authentication on existing cloud storage services using eID tokens."
authors:
    - Eduardo Duarte
    - Filipe Pinheiro
    - André Zúquete
    - Hélder Gomes
authorUrls:
    - https://www.edduarte.com
    - 
    - http://sweet.ua.pt/andre.zuquete/public_html/
    - http://wiki.ieeta.pt/wiki/index.php/Hélder_Gomes
links:
    - GitHub
    - Paper (Scopus)
    - Paper (LNI)
    - Paper (arXiv)
    - Slides (PDF)
    - Slides (SlideShare)
linkUrls:
    - https://github.com/edduarte/protbox
    - "https://www.scopus.com/record/display.uri?eid=2-s2.0-84919383572&origin=inward&txGid=1ca0335b4c696f3c89c8f47f269f70ee"
    - http://subs.emis.de/LNI/Proceedings/Proceedings237/article15.html
    - http://arxiv.org/abs/1501.03139
    - /openidentity2014/slides.pdf
    - http://www.slideshare.net/EduardoDuarte33/oid2014presentation
date: '2014-11-05 11:03:00+01:00'
medium: "https://medium.com/@edduarte/secure-and-trustworthy-file-sharing-over-
cloud-storage-using-eid-tokens-d8546a4e5a00"
type: paper
slug: protbox
aliases:
    - protbox
---

In this paper we present Protbox, an open-source, cross-platform
application for securely sharing files among strongly authenticated people
through many different cloud storage services. The secure sharing includes four
different protection features:

- confidentiality, to prevent non-authorized readings;
- integrity control, to detect malicious tampering;
- protection against un-wanted file removals, either by malicious or
  legitimate persons;
- access control to the shared data based on strong identification and
  authentication of people, using the nowadays widespread electronic, personal
  identity tokens (eIDs for short).

Many governments worldwide have been or are introducing eIDs to allow the
identification of people in the scope of Internet interactions. Unfortunately,
there are several kinds of eID types being deployed, which reduces the
possibilities of using all of them in a single system requiring the
authentication of persons. In our system we considered the case of the
Portuguese eID (Cartão de Cidadão).

Comparing Protbox with similar solutions, it has two main distinctive
characteristics:

- the key distribution between file sharing persons is performed by means of
  special files exchanged through the exact same cloud storage space used for
  file sharing, thus no extra services are required other than the trustworthy
  national PKIs (Public Key Infrastructures) used to validate eID signatures;
- the files exposed to others by means of cloud sharing are protected from
  malicious or involuntary tampering or removal.

Protbox has just two requirements regarding a cloud storage solution for
folders and files:

- it should allow the sharing of folders by many persons;
- it should allow client operating systems to have a local mount point of the
  shared folder.

Nowadays, most file- oriented cloud storage solutions, if not all, fulfill
these requirements; in our experiments we managed to explore it successfully
with Dropbox, SkyDrive, Google Drive and SugarSync.

We developed an open-source prototype in Java, [available
here](https://github.com/edduarte/protbox). It runs on any operating system
with a suitable Java Virtual Machine (JVM) and is capable of recognizing any
file system. It features a background folder synchronization engine and a
graphical user interface for dealing with key distribution requests. Protbox
randomly generates and uses a key per folder to protect all its contents,
including files and sub-directories. Files are encrypted with AES and their
integrity is ensured with HMAC-SHA1. Encrypted file names, which contain bytes
that are not acceptable for naming files in existing file systems, are coded in
a modified Base64 alphabet, which should work in most file systems. The
prototype was successfully experimented in Windows, Mac OS X and Linux with all
of the above referred cloud storage providers.