# Use Ubuntu as the base image
FROM ubuntu:latest

# Set environment variables to avoid warnings
ENV DEBIAN_FRONTEND=noninteractive

# Install essential tools
RUN apt-get update \
    && apt-get install -y curl gnupg maven openjdk-17-jdk git wget pkg-config libglib2.0-dev build-essential \
    && apt-get clean

# Install polkit 0.115 from source
# RUN wget https://www.freedesktop.org/software/polkit/releases/polkit-0.115.tar.gz 

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
