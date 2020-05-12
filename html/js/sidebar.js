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

var tmp = 0;
var hostsArray = [],
    switchesArray = [],
    controllersArray = [];
var nodes = [];

$(document).ready(function($) {
    document.oncontextmenu = function() { return false; }; //отключить выпадающее меню

});

class Host {
    constructor(id, arrLinks, links_ids) {
        this.id = id;
        this.arrLinks = arrLinks;
        this.links_ids = links_ids
    }

    getLinks() {
        //        console.log(this.arrLinks.map(value => '"' + value + '"'));
        return this.arrLinks.map(value => '"' + value + '"')
    }

    toObject() {
        return '{"id":' + '"' + this.id + '"' + ', "arrLinks":' + '[' + this.getLinks() + ']' + '}'
    }
}

class Switch {
    constructor(id, arrLinks, links_ids) {
        this.id = id;
        this.arrLinks = arrLinks
        this.links_ids = links_ids
    }
    getLinks() {
        //        console.log(this.arrLinks.map(value => '"' + value + '"'));
        return this.arrLinks.map(value => '"' + value + '"')
    }

    toObject() {
        return '{"id":' + '"' + this.id + '"' + ', "arrLinks":' + '[' + this.getLinks() + ']' + '}'
    }
}

class Controller {
    constructor(id, arrLinks) {
        this.id = id;
        this.arrLinks = arrLinks
    }
}

function addNode(type) {
    if (type == 'host') {
        mouseHelper('host');
    } else if (type == 'switch') {
        mouseHelper('switch');
    } else if (type == 'controller') {
        mouseHelper('controller');
    }
}

function mouseHelper(type) {
    let node
    if (!validateTerms()) {
        if (type == 'host') {
            id = hostsArray.length;
            var img = $('<img id="' + type + id + '">'); //Equivalent: $(document.createElement('img'))
            img.attr({
                src: "/images/icon-" + type + ".png",
            });
            img.prependTo('#main');
            $("#" + type + id).css("width", "50px");
            $("#" + type + id).css("height", "50px");
            node = $("#" + type + id).get(0);
            host = new Host(img.get(0).id, [], []);
            hostsArray.push(host);
        } else if (type == 'switch') {
            id = switchesArray.length;
            var img = $('<img id="' + type + id + '">'); //Equivalent: $(document.createElement('img'))
            img.attr({
                src: "/images/icon-" + type + ".png",
            });
            img.prependTo('#main');
            $("#" + type + id).css("width", "50px");
            $("#" + type + id).css("height", "50px");
            node = $("#" + type + id).get(0);
            sw = new Switch(img.get(0).id, [], []);
            switchesArray.push(sw);
        } else {
            id = controllersArray.length;
            var img = $('<img id="' + type + id + '">'); //Equivalent: $(document.createElement('img'))
            img.attr({
                src: "/images/icon-" + type + ".png",
            });
            img.prependTo('#main');
            $("#" + type + id).css("width", "50px");
            $("#" + type + id).css("height", "50px");
            node = $("#" + type + id).get(0);
            cont = new Controller(img.get(0).id, [], []);
            controllersArray.push(cont);
        }
    }
    node.onmousedown = function(event) {
        let shiftX = event.clientX - node.getBoundingClientRect().left;
        let shiftY = event.clientY - node.getBoundingClientRect().top;
        if (!validateTerms()) {

            if (nodes.length > 1) {
                $("#" + nodes[0].id).css("border", "none");
                $("#" + nodes[1].id).css("border", "none");
            } else if (nodes.length == 1)
                $("#" + nodes[0].id).css("border", "none");
            nodes = [];
            node.style.position = 'absolute';
            node.style.zIndex = 1000;
            document.getElementById("main").appendChild(node)
            moveAt(event.pageX, event.pageY);
            var oldLeft, oldtop;
            var flag = 0;
            // переносит узел на координаты (pageX, pageY),
            // дополнительно учитывая изначальный сдвиг относительно указателя мыши
            function moveAt(pageX, pageY) {
                if (pageX <= 280 && pageY <= 10) {
                    node.style.left = '280px';
                    node.style.top = '10px';
                    document.removeEventListener('mousemove', onMouseMove);
                    node.onmouseup = null;
                } else if (pageX <= 280 && pageY > 10) {
                    node.style.left = '280px';
                    node.style.top = pageY - shiftY + 'px';
                    document.removeEventListener('mousemove', onMouseMove);
                    node.onmouseup = null;
                } else if (pageY <= 10) {
                    node.style.left = pageX - shiftX + 'px';
                    node.style.top = '10px';
                } else {
                    if (!flag) {
                        oldLeft = node.style.left;
                        oldTop = node.style.top;
                        flag = 1;
                    }
                    node.style.left = pageX - shiftX + 'px';
                    node.style.top = pageY - shiftY + 'px';
                }
            }

            function onMouseMove(event) {
                if (event.pageX <= 280 && event.pageY <= 10) {
                    moveAt(280, 10);
                    document.removeEventListener('mousemove', onMouseMove);
                    $("#" + node.id).css("border", "none");
                    node.onmouseup = null;
                } else if (event.pageX <= 280 && event.pageY > 10) {
                    moveAt(280, event.pageY);
                    document.removeEventListener('mousemove', onMouseMove);
                    $("#" + node.id).css("border", "none");
                    node.onmouseup = null;
                } else if (event.pageY <= 10) {
                    moveAt(event.pageX, 10);
                    document.removeEventListener('mousemove', onMouseMove);
                    $("#" + node.id).css("border", "none");
                    node.onmouseup = null;
                } else {
                    moveAt(event.pageX, event.pageY);
                    lids = hostsArray.find(element => element.id == node.id).links_ids;
                    if (lids.length) {
                        for (const id of lids) {
                            if (document.getElementById(id).x1.animVal.value == oldLeft) {
                                document.getElementById(id).setAttribute('x1', node.style.left);
                                document.getElementById(id).setAttribute('y1', node.style.top);
                            } else {
                                document.getElementById(id).setAttribute('x2', node.style.left);
                                document.getElementById(id).setAttribute('y2', node.style.top);
                                console.log(document.getElementById(id).x1.animVal.value);
                                console.log(document.getElementById(id).y1.animVal.value);
                            }
                        }
                    }
                }
            }

            // передвигаем узел при событии mousemove
            document.addEventListener('mousemove', onMouseMove);

            // отпустить узел, удалить ненужные обработчики
            node.onmouseup = function() {
                document.removeEventListener('mousemove', onMouseMove);
                node.onmouseup = null;
            };
            node.ondragstart = function() {
                return false;
            };

            $(function() {
                $.contextMenu({
                    selector: '#' + node.id,
                    callback: function(key, options) { //delete realization
                        if (key == "delete") {
                            console.log(hostsArray);
                            host = hostsArray.find(element => element.id == node.id)
                                // удаляем нарисованные линии из HTML и указатели на эту связь из массива связей в других узлах
                            for (let i = 0; i < host.links_ids.length; i++) {
                                linkId = host.links_ids[i];
                                $('#' + linkId).remove();
                                for (let j = 0; j < hostsArray.length; j++) {
                                    h = hostsArray[j];
                                    for (let k = 0; k < h.links_ids.length; k++) {
                                        l = h.links_ids[k]
                                        if (l == linkId || l.includes(node.id)){
                                            $('#' + l).remove();
                                            h.links_ids = removeItemOnce(h.links_ids, l);
                                        }
                                    }
                                }
                            }

                            //удаляем указатели на данный узел в связанных с ним узлах
                            for (let j = 0; j < hostsArray.length; j++) {
                                h = hostsArray[j];
                                for (let k = 0; k < h.arrLinks.length; k++) {
                                    n = h.arrLinks[k];
                                    if (n == node.id)
                                        h.arrLinks = removeItemOnce(h.arrLinks, n);
                                }
                            }

                            hostsArray = removeItemOnce(hostsArray, host);
                            console.log(hostsArray);
                            $('#' + node.id).remove();
                        }
                    },
                    items: {
                        //                        "edit": {name: "Edit", icon: "edit"},
                        //                        "cut": {name: "Cut", icon: "cut"},
                        //                        "copy": {name: "Copy", icon: "copy"},
                        //                        "paste": {name: "Paste", icon: "paste"},
                        "delete": {
                            name: "Delete",
                            icon: "delete",
                            events: {
                                keyup: function(e) {
                                    //delete realization
                                }
                            }
                        },
                        "sep1": "---------",
                        "quit": {
                            name: "Quit",
                            icon: function() {
                                return 'context-menu-icon context-menu-icon-quit';
                            }
                        }
                    }
                });
            });
            if (event.button == 2) {
                document.removeEventListener('mousemove', onMouseMove);
                node.onmouseup = null;
            }
        } else {
            if (nodes.length < 2 && !nodes.includes(node)) {
                nodes.push(node);
                $("#" + node.id).css("border", "3px solid #7B68EE");
            } else if (nodes.length == 2) {
                // если один из узлов - хост, а другой роутер
                if (nodes[0].id.includes('switch') && nodes[1].id.includes('host')) {
                    hostsArray.find(element => element.id == nodes[1].id).arrLinks.push(nodes[0].id);
                } else if (nodes[0].id.includes('host') && nodes[1].id.includes('switch')) {
                    hostsArray.find(element => element.id == nodes[0].id).arrLinks.push(nodes[1].id);
                } else if (nodes[0].id.includes('host') && nodes[1].id.includes('host')) { // если оба узла - хосты
                    hostsArray.find(element => element.id == nodes[0].id).arrLinks.push(nodes[1].id);
                } else if (nodes[0].id.includes('switch') && nodes[1].id.includes('switch')) { // если оба узла - роутеры
                    switchesArray.find(element => element.id == nodes[0].id).arrLinks.push(nodes[1].id);
                }

                top0 = +nodes[0].style.top.slice(0, -2) + 20;
                top1 = +nodes[1].style.top.slice(0, -2) + 20;
                left0 = +nodes[0].style.left.slice(0, -2) + 20;
                left1 = +nodes[1].style.left.slice(0, -2) + 20;

                if (!$('#svg-id').length) {
                    $('<svg id="svg-id">' +
                        '<line id="link-' + nodes[0].id + nodes[1].id + '" x1="' + left0 +
                        '" x2="' + left1 +
                        '" y1="' + top0 +
                        '" y2="' + top1 +
                        '"/>' +
                        '</svg>').appendTo('#main');
                    addLinksIds(nodes[0], nodes[1], 'link-' + nodes[0].id + nodes[1].id)
                } else {
                    let oldHtml = $('#svg-id').html();
                    //                    let offset = $('#svg-id').children().length * 10;
                    $('#svg-id').html(oldHtml +
                        '<line id="link-' + nodes[0].id + nodes[1].id + '" x1="' + (left0) +
                        '" x2="' + (left1) +
                        '" y1="' + top0 +
                        '" y2="' + top1 +
                        '"/>');
                    addLinksIds(nodes[0], nodes[1], 'link-' + nodes[0].id + nodes[1].id)
                }
                $("#" + nodes[0].id).css("border", "none");
                $("#" + nodes[1].id).css("border", "none");

                nodes = [];
            }
        }
    };

}

function addLinksIds(node0, node1, id) {
    if (node0.id.includes('switch') && node1.id.includes('host')) {
        switchesArray.find(element => element.id == node0.id).links_ids.push(id);
        hostsArray.find(element => element.id == node1.id).links_ids.push(id);
    } else if (node0.id.includes('host') && node1.id.includes('switch')) {
        switchesArray.find(element => element.id == node1.id).links_ids.push(id);
        hostsArray.find(element => element.id == node0.id).links_ids.push(id);
    } else if (node0.id.includes('host') && node1.id.includes('host')) { // если оба узла - хосты
        hostsArray.find(element => element.id == node0.id).links_ids.push(id);
        hostsArray.find(element => element.id == node1.id).links_ids.push(id);
    } else if (node0.id.includes('switch') && node1.id.includes('switch')) { // если оба узла - роутеры
        switchesArray.find(element => element.id == node0.id).links_ids.push(id);
        switchesArray.find(element => element.id == node1.id).links_ids.push(id);
    }
}

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

function validateTerms() {
    var ch = document.getElementById('checkLinks');
    if (ch.checked) {
        return true;
    } else {
        return false;
    }
}

function addLink() {
    var i1 = document.createElement("input");
    i1.setAttribute('type', "text");
    i1.setAttribute('name', "node" + tmp);
    tmp++

    var i2 = document.createElement("input");
    i2.setAttribute('type', "text");
    i2.setAttribute('name', "node" + tmp);
    tmp++

    document.getElementById('sub-form').appendChild(i1);
    document.getElementById('sub-form').appendChild(i2);
}


function sendLinks() {
    $.ajax({
        type: 'POST',
        url: "/addtop",
        data: JSON.stringify({
            'hostArr': '[' + hostsArray.map(value => value.toObject()) + ']',
            'switchArr': '[' + switchesArray.map(value => value.toObject()) + ']'
        }),
        error: function(e) {
            console.log(e);
        },
        dataType: "json",
        contentType: "application/json"
    });
}