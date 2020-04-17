

var tmp = 0;
var hostsArray = [],switchesArray = [], controllersArray = [];
var nodes = [];

//
///* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
//function openNav() {
//  document.getElementById("mySidenav").style.width = "250px";
//  document.getElementById("main").style.marginLeft = "250px";
//}
//
///* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
//function closeNav() {
//  document.getElementById("mySidenav").style.width = "0";
//  document.getElementById("main").style.marginLeft = "0";
//}

function addNode(type){
    hostCount = 0, switchCount = 0, controllerCount = 0;

    if(type == 'host'){
        mouseHelper('host');
    }else if(type == 'switch'){
        mouseHelper('switch');
    }else if(type == 'controller'){
        mouseHelper('controller');
    }
}

function mouseHelper(type){
    let node
    if(!validateTerms()){
    if(type == 'host'){
        id = hostsArray.length;
        var img = $('<img id="' + type + id + '-img">'); //Equivalent: $(document.createElement('img'))
        img.attr({
           src: "/images/icon-" + type + ".png",
        });
        img.appendTo('#main');
        $("#" + type + id + "-img").css("width", "50px");
        $("#" + type + id + "-img").css("height", "50px");
        hostCount += 1;
        node = $( "#" + type + id + "-img" ).get( 0 );
        hostsArray.push(img);
    }else if (type == 'switch'){
        id = switchesArray.length;
        var img = $('<img id="' + type + id + '-img">'); //Equivalent: $(document.createElement('img'))
        img.attr({
           src: "/images/icon-" + type + ".png",
        });
        img.appendTo('#main');
        $("#" + type + id + "-img").css("width", "50px");
        $("#" + type + id + "-img").css("height", "50px");
        switchCount += 1;
        node = $( "#" + type + id + "-img" ).get( 0 );
        switchesArray.push(img);
    }else{
        id = controllersArray.length;
        var img = $('<img id="' + type + id + '-img">'); //Equivalent: $(document.createElement('img'))
        img.attr({
           src: "/images/icon-" + type + ".png",
        });
        img.appendTo('#main');
        $("#" + type + id + "-img").css("width", "50px");
        $("#" + type + id + "-img").css("height", "50px");
        controllerCount += 1;
        node = $( "#" + type + id + "-img" ).get( 0 );
        controllersArray.push(img);
    }
    }
    node.onmousedown = function(event) {
        let shiftX = event.clientX - node.getBoundingClientRect().left;
        let shiftY = event.clientY - node.getBoundingClientRect().top;
        if(!validateTerms()){
            if(nodes.length > 1){
                $("#" + nodes[0].id).css( "border", "none" );
                $("#" + nodes[1].id).css( "border", "none" );
            }else if (nodes.length == 1)
                $("#" + nodes[0].id).css( "border", "none" );
            nodes = [];
            node.style.position = 'absolute';
            node.style.zIndex = 1000;
//            node.appendTo('#main');
            document.getElementById("main").appendChild(node)
//            document.body.append(node);
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
        }else{
            if(nodes.length < 2 && !nodes.includes(node)){
                nodes.push(node);
                $("#" + node.id).css( "border", "3px solid #7B68EE" );
            }else if (nodes.length == 2){
                top0 = nodes[0].getBoundingClientRect().top + 10;
                top1 = nodes[1].getBoundingClientRect().top + 10;
                left0 = nodes[0].getBoundingClientRect().left + 10;
                left1 = nodes[1].getBoundingClientRect().left + 10;
                if(!$('#svg-id').length){
                    $('<svg id="svg-id">' +
                      '<line x1="' + left0 +
                      '" x2="' + left1 +
                      '" y1="' + top0 +
                      '" y2="' + top1 +
                      '"/>' +
                      '</svg>').appendTo('#main');
                  }else{
                    let oldHtml = $('#svg-id').html();
                    let offset = $('#svg-id').children().length * 10;
                    $('#svg-id').html(oldHtml +
                        '<line x1="' + (left0 + offset) +
                        '" x2="' + (left1 + offset) +
                        '" y1="' + top0  +
                        '" y2="' + top1 +
                        '"/>');
                  }
                  console.log(nodes[0].getBoundingClientRect().left);
                  console.log(nodes[0].getBoundingClientRect().top);
                  console.log(nodes[1].getBoundingClientRect().left);
                  console.log(nodes[1].getBoundingClientRect().top);
                $("#" + nodes[0].id).css( "border", "none" );
                $("#" + nodes[1].id).css( "border", "none" );
                nodes = [];
            }
        }
    };

}

function validateTerms(){
  var ch=document.getElementById('checkLinks');
  if (ch.checked) {
    return true;
  } else {
    return false;
  }
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
