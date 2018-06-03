FROM ubuntu:16.04

ARG NODE_VERSION=v8.9.4
ARG NVM_VERSION=v0.33.8
ARG YARN_VERSION=1.3.2
ENV TZ Asia/Tokyo
ENV LANG=ja_JP.UTF-8

# install tools
RUN apt-get update && \
    apt-get clean && \
    apt-get install -y --no-install-recommends build-essential \
    libssl-dev make mysql-client libmysqld-dev vim-tiny \
    curl openssl git ca-certificates wget python \
    language-pack-ja-base language-pack-ja \
    imagemagick ghostscript poppler-utils && \
    rm -rf /var/lib/apt/lists/*

# install Node.js
ENV NVM_DIR $HOME/.nvm
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/$NVM_VERSION/install.sh | bash && \
  . $NVM_DIR/nvm.sh && \
  nvm install $NODE_VERSION && \
  nvm alias default $NODE_VERSION && \
  nvm use default
ENV NODE_PATH $NVM_DIR/versions/node/$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/$NODE_VERSION/bin:$PATH

# install yarn
RUN wget https://yarnpkg.com/downloads/${YARN_VERSION}/yarn_${YARN_VERSION}_all.deb && dpkg -i yarn_${YARN_VERSION}_all.deb

WORKDIR /app
ADD package.json yarn.lock .flowconfig /app/
RUN yarn --pure-lockfile
