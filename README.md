# commands

## docker-compose down

## docker-compose build

## docker-compose up -d

## pnpm install

## add data folder

data
 master1_data
 master2_data
 replica1_data
 replica2_data
 replica3_data
 replica4_data


## docker inspect -f '{{.Name}} - {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(sudo docker ps -aq)

## docker inspect -f '{{.Name}} - IP: {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}} - Ports: {{range $p, $conf := .NetworkSettings.Ports}}{{$p}} -> {{(index $conf 0).HostPort}} {{end}}' $(docker ps -aq)


## docker-compose ps

## docker-compose up --build -d

builds images

## sudo rm -r -f ./data
remove directory recursively