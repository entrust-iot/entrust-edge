FROM ncarlier/mqtt
COPY mosquitto.conf /

COPY security/ca.crt /etc/mosquitto/ca_certificates/
COPY security/entrust-edge.crt /etc/mosquitto/certs/
COPY security/entrust-edge.key /etc/mosquitto/certs/

CMD ["-c", "/mosquitto.conf"]
