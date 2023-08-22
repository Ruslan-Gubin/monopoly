run: 
    docker run -d -p 3000:3000 -v monop:/app/data --rm --name monopolyfront gubinruslan1986/monopolyfront
run-dev: 
    docker run -d -p 3000:3000 -v "D:\WebProjects\Frontend\monopoly:/app" -v /app/node_modules:/app/node_modules --rm --name monopolyfront gubinruslan1986/monopolyfront
stop: 
		docker stop monopolyfront		
