FROM buildkite/puppeteer
LABEL name="dojo/site"

# Set the working directory
WORKDIR /usr/src

# Copy all files to the working directory
COPY . .

# Copy package manager files to the working directory and run install
RUN npm install

# Build the app and move the resulting build to the `/public` directory
RUN npm run now-build
