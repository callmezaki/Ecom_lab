# Use the specified Debian image
FROM debian:bullseye-slim

# Install essential tools
RUN apt-get update 
RUN apt-get install -y curl gnupg maven openjdk-17-jdk git\
    && apt-get clean

# Install Node.js (you can specify another version if needed)
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

# Load NVM and install Node.js && Angular CLI
RUN /bin/bash -c "source /root/.nvm/nvm.sh \
    && nvm install 16 \
    && nvm alias default 16 \
    && nvm use default \
    && npm install -g @angular/cli"

# RUN npm install -g @angular/cli

RUN useradd -m john
RUN echo 'john:password' | chpasswd

CMD ["/bin/bash"]