@echo off
title Rapunzel Organic Web Server
cd /d "%~dp0"
echo ========================================================
echo  Iniciando Rapunzel Organic (Catalogo & Carrito WhatsApp)
echo ========================================================
echo  Directorio: %CD%
echo  URL: http://localhost:3000
echo ========================================================
npx serve out -p 3000
pause

