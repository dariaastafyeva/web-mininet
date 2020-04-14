

var tmp = 0;

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
           src: "/images/icon-host.png",
        });
        img.appendTo('#main');
        $("#host-img").css("width", "50px");
        $("#host-img").css("height", "50px");
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
                if(pageX <= 280 && pageY <= 10){
                    node.style.left = '280px';
                    node.style.top = '10px';
                    document.removeEventListener('mousemove', onMouseMove);
                    node.onmouseup = null;
                }else if(pageX <= 280 && pageY > 10){
                    node.style.left = '280px';
                    node.style.top = pageY - shiftY + 'px';
                    document.removeEventListener('mousemove', onMouseMove);
                    node.onmouseup = null;
                }else if(pageY <= 10){
                    node.style.left = pageX - shiftX + 'px';
                    node.style.top = '10px';
                }else{
                    node.style.left = pageX - shiftX + 'px';
                    node.style.top = pageY - shiftY + 'px';
                }
            }

            function onMouseMove(event) {
                if(event.pageX <= 280 && event.pageY <= 10){
                    moveAt(280, 10);
                    document.removeEventListener('mousemove', onMouseMove);
                    node.onmouseup = null;
                }else if(event.pageX <= 280 && event.pageY > 10){
                    moveAt(280, event.pageY);
                    document.removeEventListener('mousemove', onMouseMove);
                    node.onmouseup = null;
                }else if(event.pageY <= 10){
                     moveAt(event.pageX, 10);
                     document.removeEventListener('mousemove', onMouseMove);
                    node.onmouseup = null;
                }else{
                    moveAt(event.pageX, event.pageY);
                }
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
           src: "/images/icon-router.png",
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
                if(pageX <= 280 && pageY <= 10){
                    node.style.left = '280px';
                    node.style.top = '10px';
                    document.removeEventListener('mousemove', onMouseMove);
                    node.onmouseup = null;
                }else if(pageX <= 280 && pageY > 10){
                    node.style.left = '280px';
                    node.style.top = pageY - shiftY + 'px';
                    document.removeEventListener('mousemove', onMouseMove);
                    node.onmouseup = null;
                }else if(pageY <= 10){
                    node.style.left = pageX - shiftX + 'px';
                    node.style.top = '10px';
                }else{
                    node.style.left = pageX - shiftX + 'px';
                    node.style.top = pageY - shiftY + 'px';
                }
            }

            function onMouseMove(event) {
                if(event.pageX <= 280 && event.pageY <= 10){
                    moveAt(280, 10);
                    document.removeEventListener('mousemove', onMouseMove);
                    node.onmouseup = null;
                }else if(event.pageX <= 280 && event.pageY > 10){
                    moveAt(280, event.pageY);
                    document.removeEventListener('mousemove', onMouseMove);
                    node.onmouseup = null;
                }else if(event.pageY <= 10){
                     moveAt(event.pageX, 10);
                     document.removeEventListener('mousemove', onMouseMove);
                    node.onmouseup = null;
                }else{
                    moveAt(event.pageX, event.pageY);
                }
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
           src: "/images/icon-controller.png",
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
                if(pageX <= 280 && pageY <= 10){
                    node.style.left = '280px';
                    node.style.top = '10px';
                    document.removeEventListener('mousemove', onMouseMove);
                    node.onmouseup = null;
                }else if(pageX <= 280 && pageY > 10){
                    node.style.left = '280px';
                    node.style.top = pageY - shiftY + 'px';
                    document.removeEventListener('mousemove', onMouseMove);
                    node.onmouseup = null;
                }else if(pageY <= 10){
                    node.style.left = pageX - shiftX + 'px';
                    node.style.top = '10px';
                }else{
                    node.style.left = pageX - shiftX + 'px';
                    node.style.top = pageY - shiftY + 'px';
                }
            }

            function onMouseMove(event) {
                if(event.pageX <= 280 && event.pageY <= 10){
                    moveAt(280, 10);
                    document.removeEventListener('mousemove', onMouseMove);
                    node.onmouseup = null;
                }else if(event.pageX <= 280 && event.pageY > 10){
                    moveAt(280, event.pageY);
                    document.removeEventListener('mousemove', onMouseMove);
                    node.onmouseup = null;
                }else if(event.pageY <= 10){
                     moveAt(event.pageX, 10);
                     document.removeEventListener('mousemove', onMouseMove);
                    node.onmouseup = null;
                }else{
                    moveAt(event.pageX, event.pageY);
                }
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

function addLink(){
    var i1 = document.createElement("input");
    i1.setAttribute('type',"text");
    i1.setAttribute('name',"node" + tmp);
    tmp++

    var i2 = document.createElement("input");
    i2.setAttribute('type',"text");
    i2.setAttribute('name',"node" + tmp);
    tmp++

    document.getElementById('sub-form').appendChild(i1);
    document.getElementById('sub-form').appendChild(i2);
}
