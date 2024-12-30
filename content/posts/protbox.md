---
title: "Protbox: Secure and trustworthy file sharing over cloud storage using
eID tokens"
subtitles:
  publication: "Proceedings of the Open Identity Summit 2014"
  talk: "Open Identity Summit 2014, November 4-6, Fraunhofer IAO Institute Center, Stuttgart, Germany"
description: "Open-source & cross-platform app that performs file encryption
and user authentication on existing cloud storage services."
hasThumbnail: true
keywords: [information security, cloud storage, file encryption, authentication,
eID token, dropbox, onedrive, google drive, sugarsync]
lang: [Java]
tech: [Swing]
authors:
  - name: Ed Duarte
    url: https://www.edduarte.com
  - name: Filipe Pinheiro
    url: 
  - name: André Zúquete
    url: http://sweet.ua.pt/andre.zuquete/public_html/
  - name: Hélder Gomes
    url: http://wiki.ieeta.pt/wiki/index.php/Hélder_Gomes
papers:
  - name: LNI
    url: http://subs.emis.de/LNI/Proceedings/Proceedings237/article15.html
  - name: arXiv
    url: http://arxiv.org/abs/1501.03139
slides:
  - name: Speaker Deck
    url: https://speakerdeck.com/duarte/secure-and-trustworthy-file-sharing-over-cloud-storage-using-eid-tokens
links:
  - name: Download app
    icon: external-link
    url: https://github.com/edduarte/protbox/releases/tag/3.0.2
  - name: Fork me on GitHub
    icon: github
    url: https://github.com/edduarte/protbox
date: "2014-11-05 11:03:00+01:00"
sections: [project, publication, talk]
subsections: [conference-paper, desktop]
collections: [open-source]
nocite:
- "Moritz Borgmann, Tobias Hahn, Michael Herfert, Thomas Kunz, Marcel Richter, Ursula Viebeg, and Sven Vowé. On the Security of Cloud Storage Services. Technical report, Fraunhofer Institute for Secure Information Technology, 2012."
- "Stephen Geerlings. Measurements for the Paranoid: The Effect of Encrypting Files in Cloud Storage. 2013."
- "Bernd Zwattendorfer, Bojan Suzic, Peter Teufl, and Andreas Derler. Secure Hardware-Based Public Cloud Storage. Open Identity Summit, 2013."
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
  src="/resource/protbox/screenshot_main.png"
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


{{< line >}}

## Publication

A research paper describing the architecture of Protbox was published in
_Proceedings of the Open Identity Summit 2014_, volume P-237, pages 73-84. The
full text can be read on
[LNI](http://subs.emis.de/LNI/Proceedings/Proceedings237/article15.html) or
[arXiv](http://arxiv.org/abs/1501.03139).

To cite this paper, you may use the following BibTex record:

```bibtex
@inproceedings{EdDuarte/openidentity2014/protbox,
  author = {Eduardo Duarte and Filipe Pinheiro and Andr{\'{e}} Z{\'{u}}quete and Helder Gomes},
  title = {Secure and trustworthy file sharing over cloud storage using eID tokens},
  booktitle = {Open Identity Summit 2014, volume P-237},
  pages = {73--84},
  year = {2014},
  publisher = {Gesellschaft für Informatik},
  isbn = {978-3-88579-631-2}
}
```


{{< line >}}

## Talk

The paper and desktop application described in this page were presented on the
6th of November 2014 at [Open Identity Summit 2014](https://go.eid.as/summit/)
in Stuttgart, Germany. Below are the slides used for that presentation, [hosted
on Speaker
Deck](https://speakerdeck.com/duarte/secure-and-trustworthy-file-sharing-over-cloud-storage-using-eid-tokens).

{{< sd 18f78dd7b1cf493aaf7b817d76f36383 >}}

