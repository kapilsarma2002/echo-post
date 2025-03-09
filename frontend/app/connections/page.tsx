'use client';

import React, { useState } from 'react';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, ExternalLink, Instagram, Facebook, Twitter, Trash2, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { useRouter } from 'next/navigation';

const Connections = () => {
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);
  
  // Predefined accounts that are already connected
  const [connections, setConnections] = useState([
    { id: 1, platform: 'instagram', accountName: '@yourcompany', status: 'connected', active: true },
    { id: 2, platform: 'facebook', accountName: 'Your Company Page', status: 'connected', active: true },
    { id: 3, platform: 'twitter', accountName: '@yourcompany', status: 'connected', active: true },
  ]);

  const handleConnectNew = () => {
    setIsConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setConnections([
        ...connections,
        { 
          id: connections.length + 1, 
          platform: 'linkedin', 
          accountName: 'Your Company Profile', 
          status: 'connected', 
          active: true 
        }
      ]);
      setIsConnecting(false);
      toast.success("LinkedIn connected successfully");
    }, 2000);
  };

  const handleToggleActive = (id: number) => {
    setConnections(connections.map(conn => 
      conn.id === id ? { ...conn, active: !conn.active } : conn
    ));
    
    const connection = connections.find(c => c.id === id);
    toast.success(`${connection?.accountName} ${!connection?.active ? 'activated' : 'deactivated'}`);
  };

  const handleRemoveConnection = (id: number) => {
    const connection = connections.find(c => c.id === id);
    
    if (connection) {
      setConnections(connections.filter(conn => conn.id !== id));
      toast.success(`${connection.accountName} disconnected`);
    }
  };

  const handleRefreshConnection = (id: number) => {
    const connection = connections.find(c => c.id === id);
    
    if (connection) {
      toast.info(`Refreshing connection for ${connection.accountName}`);
      
      // Simulate refreshing process
      setTimeout(() => {
        toast.success(`Connection refreshed for ${connection.accountName}`);
      }, 1500);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="h-5 w-5 text-pink-500" />;
      case 'facebook':
        return <Facebook className="h-5 w-5 text-blue-600" />;
      case 'twitter':
        return <Twitter className="h-5 w-5 text-blue-400" />;
      case 'linkedin':
        return <div className="w-5 h-5 flex items-center justify-center text-blue-800 font-bold text-sm">Li</div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-4 mb-8">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => router.push('/home')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Manage Connections</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Connected Accounts</h2>
              
              {connections.length > 0 ? (
                <div className="space-y-4">
                  {connections.map(connection => (
                    <div key={connection.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          {getPlatformIcon(connection.platform)}
                        </div>
                        <div>
                          <div className="font-medium">{connection.accountName}</div>
                          <div className="text-xs flex items-center">
                            {connection.status === 'connected' ? (
                              <span className="text-green-600 flex items-center">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Connected
                              </span>
                            ) : (
                              <span className="text-red-600 flex items-center">
                                <XCircle className="h-3 w-3 mr-1" />
                                Disconnected
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Switch 
                          checked={connection.active}
                          onCheckedChange={() => handleToggleActive(connection.id)}
                        />
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleRefreshConnection(connection.id)}
                        >
                          <RefreshCw className="h-4 w-4 text-gray-600" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleRemoveConnection(connection.id)}
                        >
                          <Trash2 className="h-4 w-4 text-gray-600" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No connected accounts</p>
                  <Button 
                    onClick={handleConnectNew} 
                    variant="outline" 
                    className="mt-4"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Connect Your First Account
                  </Button>
                </div>
              )}
              
              <Button 
                onClick={handleConnectNew} 
                disabled={isConnecting}
                className="w-full mt-6"
              >
                {isConnecting ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Connect New Account
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Connection Status</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-green-100 p-2 rounded-md">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-900">All Systems Operational</h4>
                      <p className="mt-1 text-sm text-gray-600">Your connections are working correctly.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">API Usage</h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Instagram API</span>
                      <span>68%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-pink-500 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Facebook API</span>
                      <span>45%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Twitter API</span>
                      <span>23%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-400 rounded-full" style={{ width: '23%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Troubleshooting</h2>
              
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => toast.info("Checking API connectivity...")}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Check API Connectivity
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => toast.info("Troubleshooting guide opened")}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Troubleshooting Guide
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => toast.info("Support team contacted")}
                >
                  <div className="w-4 h-4 mr-2 flex items-center justify-center text-sm">?</div>
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connections;
