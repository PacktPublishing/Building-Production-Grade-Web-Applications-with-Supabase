#!/bin/bash 

function merge {
	git pull --rebase
	git cherry-pick -x $1
	git status

	echo "Commit? (y/n):"
	read XN

	if [ "$XN" = "y" ]; then 
		echo "Committing" 
		git push origin
	else
		echo "Abort!!"
		exit
	fi;
}

if [ ! -n "$1" ]; then
	echo "Usage: cherrypick.sh <hash> [<branch1> <branch2> <branch3> ...]"
	echo 
	echo "e.g. cherrypick.sh fb5cfe1cf2165abee 1.0.0 1.1.0 1.2.0"
	exit
fi

if [ ! -n "$2" ]; then
	echo "cherry-picking to current branch"
	merge $1
else 
	for arg in ${@:2}
	do
		git checkout $arg
		merge $1		
	done
fi