yarn run build
rm -rf ~/.config/karabiner
ln -s ~/projects/karabiner/ ~/.config  
launchctl kickstart -k gui/`id -u`/org.pqrs.karabiner.karabiner_console_user_server 