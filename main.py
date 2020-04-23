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
    dict_str = request.get_json(force=True)
    hosts_list = json.loads(dict_str['hostArr'])
    switches_list = json.loads(dict_str['switchArr'])
    str_file = """from mininet.node import CPULimitedHost
from mininet.topo import Topo
from mininet.net import Mininet
from mininet.log import setLogLevel, info
from mininet.node import RemoteController
from mininet.cli import CLI


class SimplePktSwitch(Topo):

    def __init__(self, **opts):
        # Initialize topology
        # It uses the constructor for the Topo class
        super(SimplePktSwitch, self).__init__(**opts)\n\n"""

    # creating hosts
    for host in hosts_list:
        hid = str(int(host['id'][4:]) + 1)
        str_file += "        h" + hid + " = self.addHost('h" + hid + "')\n"

    str_file += "\n"

    # creating switches
    for switch in switches_list:
        sid = str(int(switch['id'][6:]) + 1)
        str_file += "        s" + sid + " = self.addSwitch('s" + sid + "', dpid='000000000000000" + sid + "')\n"

    str_file += "\n"

    # adding links from hosts
    for host in hosts_list:
        if len(host['arrLinks']):
            hid = str(int(host['id'][4:]) + 1)
            for link in host['arrLinks']:
                if 'host' in link:
                    tmp = 'h'
                    link_id = str(int(link[4:]) + 1)
                else:
                    tmp = 's'
                    link_id = str(int(link[6:]) + 1)
                str_file += "        self.addLink(h" + hid + ", " + tmp + link_id + ")\n"

    str_file += "\n"

    # adding links between switches
    for switch in switches_list:
        if len(switch['arrLinks']):
            cid = str(int(switch['id'][6:]) + 1)
            for link in switch['arrLinks']:
                link_id = str(int(link[6:]) + 1)
                str_file += "        self.addLink(s" + cid + ", s" + link_id + ")\n"

    str_file += "\n\n"
    str_file += """def run():
    c = RemoteController('c', '0.0.0.0', 6633)
    net = Mininet(topo=SimplePktSwitch(), host=CPULimitedHost, controller=None)
    net.addController(c)
    net.start()
    #net.pingAll()
    info('*** Routing Table on Router:\\n')
    hosts = net.hosts
    server = hosts[0]
    outfile = 'myinfo.out'
    errfile = 'myerror.err'
    hosts[1].cmdPrint('ping', server.IP(), '>', outfile, '2>', errfile, '&')
    net.stop()
    
    
if __name__ == '__main__':
    setLogLevel('info')
    run()
    """

    # handle = open("mycode.py", "w")
    # handle.write(str_file)
    # handle.close()

    print(str_file)
    print("*******************************************************************************************")
    # os.system("echo ra456897 | sudo -S python ~/Documents/web-mininet/mycode.py")
    print("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    return redirect('index.html')


if __name__ == '__main__':
    app.run()


