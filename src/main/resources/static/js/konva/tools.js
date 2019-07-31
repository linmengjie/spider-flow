function loadImage(src) {
    return new Promise((resolve) => {
        var img = new Image();
        img.onload = function(){
            resolve(this);
        };
        img.src = src;
    });
}
function buildMenu(menuArr){

}