from mininet.topo import Topo
from mininet.net import Mininet
from mininet.util import irange, dumpNodeConnections
from mininet.log import setLogLevel, info
from mininet.node import OVSController
from mininet.node import CPULimitedHost
from mininet.link import TCLink


class LinearTopo(Topo):
   "Linear topology of k switches, with one host per switch."

   def __init__(self, k=2, **opts):
       """Init.
           k: number of switches (and hosts)
           hconf: host configuration options
           lconf: link configuration options"""

       super(LinearTopo, self).__init__(**opts)

       self.k = k

       lastSwitch = None
       for i in irange(1, k):
           host = self.addHost('h%s' % i)
           switch = self.addSwitch('s%s' % i)
           self.addLink( host, switch)
           if lastSwitch:
               self.addLink( switch, lastSwitch)
           lastSwitch = switch

def simpleTest():
    "Create and test a simple network"
    topo = LinearTopo(k=4)
    net = Mininet(topo = topo, controller = OVSController)
    net.start()
    print("Dumping host connections")
    dumpNodeConnections(net.hosts)
    print("Testing network connectivity")
    info('*** Routing Table on Router:\n')
    net.pingAll()
    hosts = net.hosts
    server = hosts[0]
    # outfile = open("myinfo.out", "w+")
    # errfile = open("myerror.err", "w+")
    outfile = "myinfo.out"
    errfile = "myerror.err"
    f = open("info.out", "w+")

    lineno = 1
    for line in f.readlines():
        print("%d: %s" % (lineno, line.strip()))
        lineno += 1
    f.close()
    hosts[1].cmdPrint('ping', server.IP(),
               '>', outfile,
               '2>', errfile,
               '&')
    net.stop()

if __name__ == '__main__':
   # Tell mininet to print useful information
   setLogLevel('info')
   simpleTest()