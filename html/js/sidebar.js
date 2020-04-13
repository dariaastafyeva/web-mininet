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
    hostCount = switchCount = contCount = 0;

    if(type == 'host'){
        var img = $('<img id="host-img">'); //Equivalent: $(document.createElement('img'))
        img.attr({
           src: "/images/host.png",
        });
        img.appendTo('#main');
        hostCount += 1;
        let node = $( "#host-img" ).get( 0 );
        node.onmousedown = function(event) {
            let shiftX = event.clientX - node.getBoundingClientRect().left;
            let shiftY = event.clientY - node.getBoundingClientRect().top;

            node.style.position = 'absolute';
            node.style.zIndex = 1000;
            document.body.append(node);

            moveAt(event.pageX, event.pageY);

            // переносит мяч на координаты (pageX, pageY),
            // дополнительно учитывая изначальный сдвиг относительно указателя мыши
            function moveAt(pageX, pageY) {
            node.style.left = pageX - shiftX + 'px';
            node.style.top = pageY - shiftY + 'px';
            }

            function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
            }

            // передвигаем мяч при событии mousemove
            document.addEventListener('mousemove', onMouseMove);

            // отпустить мяч, удалить ненужные обработчики
            node.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            node.onmouseup = null;
            };
            node.ondragstart = function() {
            return false;
            };
            };
    }else if(type == 'switch'){
        var img = $('<img id="switch-img">'); //Equivalent: $(document.createElement('img'))
        img.attr({
           src: "/images/switch.png",
        });
        img.appendTo('#main');
        switchCount += 1;
        let node = $( "#switch-img" ).get( 0 );
        node.onmousedown = function(event) {
            let shiftX = event.clientX - node.getBoundingClientRect().left;
            let shiftY = event.clientY - node.getBoundingClientRect().top;

            node.style.position = 'absolute';
            node.style.zIndex = 1000;
            document.body.append(node);

            moveAt(event.pageX, event.pageY);

            // переносит мяч на координаты (pageX, pageY),
            // дополнительно учитывая изначальный сдвиг относительно указателя мыши
            function moveAt(pageX, pageY) {
            node.style.left = pageX - shiftX + 'px';
            node.style.top = pageY - shiftY + 'px';
            }

            function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
            }

            // передвигаем мяч при событии mousemove
            document.addEventListener('mousemove', onMouseMove);

            // отпустить мяч, удалить ненужные обработчики
            node.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            node.onmouseup = null;
            };
            node.ondragstart = function() {
            return false;
            };
            };
    }else if(type == 'controller'){
        var img = $('<img id="contr-img">'); //Equivalent: $(document.createElement('img'))
        img.attr({
           src: "/images/controller.png",
        });
        img.appendTo('#main');
        switchCount += 1;
        let node = $( "#contr-img" ).get( 0 );
        node.onmousedown = function(event) {
            let shiftX = event.clientX - node.getBoundingClientRect().left;
            let shiftY = event.clientY - node.getBoundingClientRect().top;

            node.style.position = 'absolute';
            node.style.zIndex = 1000;
            document.body.append(node);

            moveAt(event.pageX, event.pageY);

            // переносит мяч на координаты (pageX, pageY),
            // дополнительно учитывая изначальный сдвиг относительно указателя мыши
            function moveAt(pageX, pageY) {
            node.style.left = pageX - shiftX + 'px';
            node.style.top = pageY - shiftY + 'px';
            }

            function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
            }

            // передвигаем мяч при событии mousemove
            document.addEventListener('mousemove', onMouseMove);

            // отпустить мяч, удалить ненужные обработчики
            node.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            node.onmouseup = null;
            };
            node.ondragstart = function() {
            return false;
            };
            };
    }
            
    console.log(node)
}
//node = document.getElementById('host-img');
