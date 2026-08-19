# Kinetic Dex - Production Dockerfile (NGINX Alpine)
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy Kinetic Dex application source code to NGINX html folder
COPY index.html /usr/share/nginx/html/
COPY src/ /usr/share/nginx/html/src/
COPY stitch_pok_marathon_odyssey/ /usr/share/nginx/html/stitch_pok_marathon_odyssey/

# Expose HTTP port 80
EXPOSE 80

# Start NGINX daemon
CMD ["nginx", "-g", "daemon off;"]
