@echo off
echo Iniciando servidor local para tu Galeria...
echo Abrira la web en http://localhost:8000
start "" "http://localhost:8000"
python -m http.server 8000
pause
