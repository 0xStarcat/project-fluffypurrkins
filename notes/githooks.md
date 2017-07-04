# Githooks

#!/bin/bash
while read oldrev newrev ref
do
# clear extra changes on this end
echo Running $BASH_SOURCE
set | egrep GIT
echo PWD is $PWD
  if [[ $ref =~ .*/master$ ]];
    then
      echo "Master ref received.  Deploying master branch to production..."
      git --work-tree=/var/www/ --git-dir=/var/www/project-fluffypurrkins checkout -f

      echo "Restarting pm2 server"
      pm2 restart server
  else
   echo "Ref $ref successfully received.  Doing nothing: only the master branch may be deployed on this server." 
  fi
done

 git --work-tree=/var/www/ --git-dir=/var/www/project-fluffypurrkins checkout -f

 -- WORK-TREE IS WHERE THE NEW FILES GET WRITTEN
 -- GIT DIR IS WHERE THE .git DIR IS OR WHERE THE BARE GIT FOLDERS ARE