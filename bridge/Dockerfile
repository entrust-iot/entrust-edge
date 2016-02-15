FROM ncarlier/mqtt
COPY mosquitto.conf /

COPY security/ca.crt /etc/mosquitto/ca_certificates/
COPY security/entrust-edge.crt /etc/mosquitto/certs/
COPY security/entrust-edge.key /etc/mosquitto/certs/
RUN chown mosquitto /etc/mosquitto/certs/entrust-edge.key

COPY security/service-ca.crt /etc/mosquitto/ca_certificates/
COPY security/service-client.crt /etc/mosquitto/certs/
COPY security/service-client.key /etc/mosquitto/certs/

CMD ["-c", "/mosquitto.conf"]
