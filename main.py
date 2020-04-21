import os
import json
import sys
from mininet.log import info, setLogLevel
from mininet.net import Mininet, VERSION
from mininet.util import netParse, ipAdd, quietRun, buildTopo, custom, customClass, dumpNodeConnections
from mininet.term import makeTerm, cleanUpScreens
from mininet.moduledeps import moduleDeps
from mininet.topolib import TreeTopo
from mininet.log import setLogLevel, info
from mininet.cli import CLI
from mininet.link import Link, TCLink, Intf
from mininet.node import CPULimitedHost, Node, Host, Controller, Switch, OVSSwitch, UserSwitch, RemoteController, NOX, OVSController
from mininet.topo import Topo, SingleSwitchTopo, LinearTopo, SingleSwitchReversedTopo
from flask import Flask, request, render_template, redirect, url_for, jsonify
from collections import namedtuple
from functools import partial

from flask import Flask, send_from_directory, request, redirect, Response

app = Flask(__name__, static_folder='html')


@app.route('/', defaults={'path': ''}, methods=['GET'])
@app.route('/<path:path>', methods=['GET'])
def index(path):
    if path != '' and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


@app.route('/addtop', methods=['POST'])
def addtop():
    print("+++++++++++++++++")
    # json_string = request.get_json(force=True)
    # print(json_string)
    # a = json.loads(json_string['hostArr'])
    # print("*******************")
    # print(len(a))
    # print(a[0])
    # print(a[0]['id'])
    # b = a[1][' arrLinks']
    # print(type(b))
    # print(b)

    dict_str = request.get_json(force=True)
    hosts_list = json.loads(dict_str['hostArr'])
    switches_list = json.loads(dict_str['switchArr'])
    h, s = 1, 1
    amt_h = len(hosts_list)
    amt_s = len(switches_list)
    str_file = """from mininet.node import CPULimitedHost
from mininet.topo import Topo
from mininet.net import Mininet
from mininet.log import setLogLevel, info
from mininet.node import RemoteController
from mininet.cli import CLI


class SimplePktSwitch(Topo):

    def __init__(self, **opts):
        # Initialize topology
        # It uses the constructor for the Topo cloass
        super(SimplePktSwitch, self).__init__(**opts)\n\n"""

    # while h <= amt_h:
    #     str_file += "        h" + str(h) + " = self.addHost('h" + str(h) + "')\n"
    #     h += 1
    # while s <= amt_s:
    #     str_file += "        s" + str(s) + " = self.addSwitch('s" + str(s) + "', dpid='000000000000000" + str(s) + "')\n"
    #     s += 1

    for host in hosts_list:
        hid = host['id']
        str_file += "        h" + hid[4:] + " = self.addHost('h" + hid[4:] + "')\n"

    for switch in switches_list:
        sid = switch['id']
        str_file += "        s" + sid[6:] + " = self.addSwitch('s" + sid[6:] + "', dpid='000000000000000" + sid[6:] + "')\n"

    for host in hosts_list:
        if len(host['arrLinks']):
            hid = host['id']
            for link in host['arrLinks']:
                if 'host' in link:
                    tmp = 'h'
                    link_id = link[4:]
                else:
                    tmp = 's'
                    link_id = link[6:]
                str_file += "        self.addLink(h" + hid[4:] + ", " + tmp + link_id + ")\n"

    # handle = open("mycode.py", "w")
    # handle.write(str_file)
    # handle.close()

    print(str_file)
    print("*******************************************************************************************")
    # os.system("python ~/Documents/web-mininet/mycode.py")
    print("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    return redirect('index.html')


if __name__ == '__main__':
    app.run()


