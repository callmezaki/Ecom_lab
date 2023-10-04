# Use the specified Debian image
FROM debian:bullseye-slim

# Install essential tools
RUN apt-get update 
RUN apt-get install -y curl gnupg maven openjdk-17-jdk git\
    && apt-get clean

# Install Node.js (you can specify another version if needed)
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Install Angular CLI globally
RUN npm install -g @angular/cli


# Default command to run when the container starts
CMD ["/bin/bash"]