Generating the server keys
==========================

`$ ./generate-CA.sh entrust-edge`

That will generate files ca.crt, ca.key, ca.srl, entrust-edge.crt,
entrust-edge.csr, entrust-edge.key

Generating client keys
======================

Run the command in the same folder to use the same CA

`$ ./generate-CA.sh client <clientName>`

That will generate files <clientName>.crt, <clientName>.csr, <clientName.key>

- copy the ca.crt, <clientName>.crt, <clientName.key> files to the security
folder of the client

