# Use Ubuntu as the base image
FROM ubuntu:23.04


COPY script.sh /root/script.sh
# Install essential tools
RUN apt-get update \
    && apt-get install -y curl gnupg maven openjdk-17-jdk git wget \
    && apt-get clean

# Install Node.js (you can specify another version if needed)
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

# Load NVM and install Node.js && Angular CLI
RUN /bin/bash -c "source /root/.nvm/nvm.sh \
    && nvm install 16 \
    && nvm alias default 16 \
    && nvm use default \
    && npm install -g @angular/cli"

# Create a new user 'john' and set the password
RUN useradd -m john
RUN echo 'john:password' | chpasswd

# Set the default command to run on container start
CMD ["/bin/bash"]
