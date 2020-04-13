/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

function addNode(type){
    if(type == 'host'){
        var img = $('<img id="host-img">'); //Equivalent: $(document.createElement('img'))
        img.attr({
           src: "/images/host.png",
        });
        img.appendTo('#main');
        console.log(img)
        console.log(img.get())
        ball = $( "#host-img" ).get( 0 );
        console.log(ball)
        ball.onmousedown = function(event) {
            let shiftX = event.clientX - ball.getBoundingClientRect().left;
            let shiftY = event.clientY - ball.getBoundingClientRect().top;

            ball.style.position = 'absolute';
            ball.style.zIndex = 1000;
            document.body.append(ball);

            moveAt(event.pageX, event.pageY);

            // переносит мяч на координаты (pageX, pageY),
            // дополнительно учитывая изначальный сдвиг относительно указателя мыши
            function moveAt(pageX, pageY) {
            ball.style.left = pageX - shiftX + 'px';
            ball.style.top = pageY - shiftY + 'px';
            }

            function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
            }

            // передвигаем мяч при событии mousemove
            document.addEventListener('mousemove', onMouseMove);

            // отпустить мяч, удалить ненужные обработчики
            ball.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            ball.onmouseup = null;
            };
            ball.ondragstart = function() {
            return false;
            };
            };
        }
    console.log(ball)
}
//ball = document.getElementById('host-img');
