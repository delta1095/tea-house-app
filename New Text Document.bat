@echo off

start "" cmd /c "yarn dev"

timeout /t 5

start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" http://localhost:3000
