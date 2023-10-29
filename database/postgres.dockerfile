FROM postgres:16.0-bullseye


LABEL author="Brian Twene, Simon Klavzar, Lin Chen"
LABEL description="Custom Postgres Image for Ambitious Messenger"
LABEL version="1.0"


# COPY scripts/*.sql /docker-entrypoint-initdb.d/