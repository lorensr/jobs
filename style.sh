i=0;
while true
do 
    lessc style.less styles.min.css
    echo "less loop... "$i
    ((i++))
    sleep 1
done
