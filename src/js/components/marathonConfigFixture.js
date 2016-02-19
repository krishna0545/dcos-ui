/* eslint-disable */
module.exports.schema = {
  "additionalProperties" : false,
  "description" : "Marathon DCOS Service properties",
  "properties" : {
    "application" : {
      "additionalProperties" : false,
      "description" : "Marathon app configuration properties.",
      "properties" : {
        "id" : {
          "description" : "The ID of this Marathon application inside DCOS base Marathon.",
          "type" : "string"
        },
        "cpus" : {
          "default" : 2,
          "description" : "CPU shares to allocate to each Marathon instance.",
          "minimum" : 0,
          "type" : "number"
        },
        "mem" : {
          "default" : 1536,
          "description" : "Memory (MB) to allocate to each Marathon instance.",
          "minimum" : 512,
          "type" : "number"
        },
        "instances" : {
          "default" : 1,
          "description" : "Number of Marathon instances to run.",
          "minimum" : 0,
          "type" : "integer"
        },
        "uris" : {
          "default" : [ ],
          "description" : "List of URIs that will be downloaded and made available in the current working directory of Marathon. For example this can be used to download a Java keystore file for SSL configuration.",
          "items" : {
            "pattern" : "^[\\s]+",
            "type" : "string"
          },
          "type" : "array"
        }
      },
      "required" : [ "cpus", "mem", "instances" ],
      "type" : "object"
    },
    "jvm" : {
      "additionalProperties" : false,
      "description" : "JVM configuration properties",
      "properties" : {
        "heap-min" : {
          "default" : 256,
          "description" : "Memory (MB) start size for the JVM heap. This number should be be less or equals than the heap-max.",
          "minimum" : 0,
          "type" : "integer"
        },
        "heap-max" : {
          "default" : 768,
          "description" : "Memory (MB) max size for the JVM heap. This number should be less than the memory allocated to the Marathon instance (General rule: 50%).",
          "minimum" : 0,
          "type" : "integer"
        }
      },
      "required" : [ "heap-min", "heap-max" ],
      "type" : "object"
    },
    "marathon" : {
      "additionalProperties" : true,
      "description" : "Marathon command line flags. These are the same flags that are passed through to Marathon when launching manually from the command line. See details here: https://mesosphere.github.io/marathon/docs/command-line-flags.html",
      "properties" : {
        "access-control-allow-origin" : {
          "description" : "The origin(s) to allow in Marathon. Not set by default. Example values are \"*\", or \"http://localhost:8888, http://domain.com\"",
          "type" : "string"
        },
        "artifact-store" : {
          "description" : "URL to the artifact store. Supported store types hdfs, file. Example: hdfs://localhost:54310/path/to/store, file:///var/log/store",
          "type" : "string"
        },
        "assets-path" : {
          "description" : "Set a local file system path to load assets from, instead of loading them from the packaged jar.",
          "type" : "string"
        },
        "checkpoint" : {
          "description" : "Enabled: (Default) Enable checkpointing of tasks. Requires checkpointing enabled on slaves. Allows tasks to continue running during mesos-slave restarts and upgrades Disabled: Disable checkpointing of tasks.",
          "type" : "boolean",
          "default" : true
        },
        "decline-offer-duration" : {
          "description" : "(Default: 120 seconds) The duration (milliseconds) for which to decline offers by default",
          "type" : "integer",
          "default" : 120000
        },
        "default-accepted-resource-roles" : {
          "description" : "Default for the defaultAcceptedResourceRoles attribute of all app definitions as a comma-separated list of strings. This defaults to all roles for which this Marathon instance is configured to receive offers.",
          "type" : "string"
        },
        "disable-http" : {
          "description" : "Disable listening for HTTP requests completely. HTTPS is unaffected.",
          "type" : "boolean",
          "default" : false
        },
        "env-vars-prefix" : {
          "description" : "Prefix to use for environment variables injected automatically into all started tasks.",
          "type" : "string"
        },
        "event-stream-max-outstanding-messages" : {
          "description" : "The event stream buffers events, that are not already consumed by clients. This number defines the number of events that get buffered on the server side, before messages are dropped.",
          "type" : "integer",
          "default" : 50
        },
        "event-subscriber" : {
          "description" : "The event subscription module to use. E.g. http_callback.",
          "type" : "string"
        },
        "executor" : {
          "description" : "Executor to use when none is specified. If not defined the Mesos command executor is used by default.",
          "type" : "string",
          "default" : "//cmd"
        },
        "failover-timeout" : {
          "description" : "(Default: 1 week) The failover_timeout for mesos in seconds.",
          "type" : "integer",
          "default" : 604800
        },
        "framework-name" : {
          "description" : "Framework name to register with Mesos.",
          "type" : "string",
          "default" : "marathon-user"
        },
        "ha" : {
          "description" : "Enabled: (Default) Run Marathon in HA mode with leader election. Allows starting an arbitrary number of other Marathons but all need to be started in HA mode. This mode requires a running ZooKeeper Disabled: Run Marathon in single node mode.",
          "type" : "boolean",
          "default" : true
        },
        "hostname" : {
          "description" : "The advertised hostname that is used for the communication with the Mesos master. The value is also stored in the persistent store so another standby host can redirect to the elected leader.",
          "type" : "string"
        },
        "http-address" : {
          "description" : "The address to listen on for HTTP requests",
          "type" : "string"
        },
        "http-credentials" : {
          "description" : "Credentials for accessing the http service. If empty, anyone can access the HTTP endpoint. A username:password pair is expected where the username must not contain ':'. May also be specified with the `MESOSPHERE_HTTP_CREDENTIALS` environment variable. ",
          "type" : "string"
        },
        "http-endpoints" : {
          "description" : "The URLs of the event endpoints added to the current list of subscribers on startup. You can manage this list during runtime by using the /v2/eventSubscriptions API endpoint.",
          "type" : "string"
        },
        "http-event-callback-slow-consumer-timeout" : {
          "description" : "A http event callback consumer is considered slow, if the delivery takes longer than this timeout (ms)",
          "type" : "integer",
          "default" : 10000
        },
        "http-max-concurrent-requests" : {
          "description" : "The number of concurrent HTTP requests that are allowed before rejecting.",
          "type" : "integer"
        },
        "http-port" : {
          "description" : "The port to listen on for HTTP requests",
          "type" : "integer",
          "default" : 0
        },
        "http-realm" : {
          "description" : "The security realm (aka 'area') associated with the credentials",
          "type" : "string",
          "default" : "Mesosphere"
        },
        "https-address" : {
          "description" : "The address to listen on for HTTPS requests.",
          "type" : "string"
        },
        "https-port" : {
          "description" : "The port to listen on for HTTPS requests",
          "type" : "integer",
          "default" : 0
        },
        "launch-token-refresh-interval" : {
          "description" : "The interval (ms) in which to refresh the launch tokens to --launch_token_count",
          "type" : "integer",
          "default" : 30000
        },
        "launch-tokens" : {
          "description" : "Launch tokens per interval",
          "type" : "integer",
          "default" : 100
        },
        "leader-proxy-connection-timeout" : {
          "description" : "Maximum time, in milliseconds, to wait for connecting to the current Marathon leader from another Marathon instance.",
          "type" : "integer",
          "default" : 5000
        },
        "leader-proxy-read-timeout" : {
          "description" : "Maximum time, in milliseconds, for reading from the current Marathon leader.",
          "type" : "integer",
          "default" : 10000
        },
        "local-port-max" : {
          "description" : "Max port number to use when assigning globally unique service ports to apps.",
          "type" : "integer",
          "default" : 20000
        },
        "local-port-min" : {
          "description" : "Min port number to use when assigning globally unique service ports to apps.",
          "type" : "integer",
          "default" : 10000
        },
        "logging-level" : {
          "description" : "Set logging level to one of: off, error, warn, info, debug, trace, all",
          "type" : "string"
        },
        "marathon-store-timeout" : {
          "description" : "(deprecated) Maximum time, in milliseconds, to wait for persistent storage operations to complete. This option is no longer used and will be removed in a later release.",
          "type" : "integer"
        },
        "master" : {
          "description" : "The URL of the Mesos master",
          "type" : "string",
          "default" : "zk://master.mesos:2181/mesos"
        },
        "max-apps" : {
          "description" : "The maximum number of applications that may be created.",
          "type" : "integer"
        },
        "max-tasks-per-offer" : {
          "description" : "Maximum tasks per offer. Do not start more than this number of tasks on a single offer.",
          "type" : "integer",
          "default" : 1
        },
        "mesos-authentication-principal" : {
          "description" : "Mesos Authentication Principal.",
          "type" : "string"
        },
        "mesos-authentication-secret-file" : {
          "description" : "Mesos Authentication Secret.",
          "type" : "string"
        },
        "mesos-leader-ui-url" : {
          "description" : "The host and port (e.g. \"http://mesos_host:5050\") of the Mesos master.",
          "type" : "string",
          "default" : "/mesos"
        },
        "mesos-role" : {
          "description" : "Mesos role for this framework. If set, Marathon receives resource offers for the specified role in addition to resources with the role designation '*'.",
          "type" : "string"
        },
        "mesos-user" : {
          "description" : "Mesos user for this framework.",
          "type" : "string"
        },
        "metrics" : {
          "description" : "Enabled: (Default) Enable metric measurement of service method calls. Disabled: Disable metric measurement of service method calls.",
          "type" : "boolean",
          "default" : true
        },
        "min-revive-offers-interval" : {
          "description" : "Do not ask for all offers (also already seen ones) more often than this interval (ms).",
          "type" : "integer",
          "default" : 5000
        },
        "offer-matching-timeout" : {
          "description" : "Offer matching timeout (ms). Stop trying to match additional tasks for this offer after this time.",
          "type" : "integer",
          "default" : 1000
        },
        "on-elected-prepare-timeout" : {
          "description" : "The timeout for preparing the Marathon instance when elected as leader.",
          "type" : "integer",
          "default" : 180000
        },
        "plugin-conf" : {
          "description" : "The plugin configuration file.",
          "type" : "string"
        },
        "plugin-dir" : {
          "description" : "Path to a local directory containing plugin jars.",
          "type" : "string"
        },
        "reconciliation-initial-delay" : {
          "description" : "This is the length of time, in milliseconds, before Marathon begins to periodically perform task reconciliation operations",
          "type" : "integer",
          "default" : 15000
        },
        "reconciliation-interval" : {
          "description" : "This is the length of time, in milliseconds, between task reconciliation operations.",
          "type" : "integer",
          "default" : 600000
        },
        "reporter-datadog" : {
          "description" : "URL to dogstatsd agent. e.g. udp://localhost:8125?prefix=marathon-test&tags=marathon&interval=10",
          "type" : "string"
        },
        "reporter-graphite" : {
          "description" : "URL to graphite agent. e.g. tcp://localhost:2003?prefix=marathon-test&interval=10",
          "type" : "string"
        },
        "revive-offers-repetitions" : {
          "description" : "Repeat every reviveOffer request this many times, delayed by the --min_revive_offers_interval.",
          "type" : "integer",
          "default" : 3
        },
        "save-tasks-to-launch-timeout" : {
          "description" : "Timeout (ms) after matching an offer for saving all matched tasks that we are about to launch. When reaching the timeout, only the tasks that we could save within the timeout are also launched. All other task launches are temporarily rejected and retried later.",
          "type" : "integer",
          "default" : 3000
        },
        "scale-apps-initial-delay" : {
          "description" : "This is the length of time, in milliseconds, before Marathon begins to periodically attempt to scale apps.",
          "type" : "integer",
          "default" : 15000
        },
        "scale-apps-interval" : {
          "description" : "This is the length of time, in milliseconds, between task scale apps.",
          "type" : "integer",
          "default" : 300000
        },
        "ssl-keystore-password" : {
          "description" : "Password for the keystore supplied with the `ssl_keystore_path` option. Required if `ssl_keystore_path` is supplied. May also be specified with the `MESOSPHERE_KEYSTORE_PASS` environment variable.",
          "type" : "string"
        },
        "ssl-keystore-path" : {
          "description" : "Path to the SSL keystore. HTTPS (SSL) will be enabled if this option is supplied. Requires `--ssl_keystore_password`. May also be specified with the `MESOSPHERE_KEYSTORE_PATH` environment variable.",
          "type" : "string"
        },
        "store-cache" : {
          "description" : "Enabled: (Default) Enable an in-memory cache for the storage layer. Disabled: Disable the in-memory cache for the storage layer. ",
          "type" : "boolean",
          "default" : true
        },
        "task-launch-confirm-timeout" : {
          "description" : "Time, in milliseconds, to wait for a task to enter the TASK_STAGING state before killing it.",
          "type" : "integer",
          "default" : 300000
        },
        "task-launch-timeout" : {
          "description" : "Time, in milliseconds, to wait for a task to enter the TASK_RUNNING state before killing it.",
          "type" : "integer",
          "default" : 300000
        },
        "tracing" : {
          "description" : "Enabled: Enable trace logging of service method calls. Disabled: (Default) Disable trace logging of service method calls.",
          "type" : "boolean",
          "default" : false
        },
        "webui-url" : {
          "description" : "The HTTP(S) url of the web ui, defaulting to the advertised hostname.",
          "type" : "string"
        },
        "zk" : {
          "description" : "ZooKeeper URL for storing state. Format: zk://host1:port1,host2:port2,.../path",
          "type" : "string"
        },
        "zk-compression" : {
          "description" : "Enabled: (Default) Enable compression of zk nodes, if the size of the node is bigger than the configured threshold. Disabled: Disable compression of zk nodes",
          "type" : "boolean",
          "default" : true
        },
        "zk-compression-threshold" : {
          "description" : "(Default: 64 KB) Threshold in bytes, when compression is applied to the ZooKeeper node.",
          "type" : "integer",
          "default" : 65536
        },
        "zk-max-versions" : {
          "description" : "Limit the number of versions, stored for one entity.",
          "type" : "integer",
          "default" : 25
        },
        "zk-session-timeout" : {
          "description" : "The timeout for ZooKeeper sessions in milliseconds",
          "type" : "integer",
          "default" : 10000
        },
        "zk-timeout" : {
          "description" : "The timeout for ZooKeeper in milliseconds.",
          "type" : "integer",
          "default" : 10000
        }
      },
      "required" : [ "master", "framework-name" ],
      "type" : "object"
    }
  },
  "required" : [ "application", "jvm", "marathon" ],
  "type" : "object"
};

// What the object should look like:
module.exports.jsonDocument = {
  "application": {
    "id": "stringValue",
    "cpus": 1,
    "mem": 1248,
    "instances": 1,
    "uris": ["stringValue", "anotherStringValue"]
  },
  "jvm": {
    "heap-min": 256,
    "heap-max": 768
  },
  "marathon": {
    "access-control-allow-origin" : "stringValue",
    "artifact-store" : "stringValue",
    "assets-path" : "stringValue",
    "checkpoint" : true,
    "decline-offer-duration" : 120000,
    "default-accepted-resource-roles" : "stringValue",
    "disable-http" : false,
    "env-vars-prefix" : "stringValue",
    "event-stream-max-outstanding-messages" : 50,
    "event-subscriber" : "stringValue",
    "executor" : "//cmd",
    "failover-timeout" : 604800,
    "framework-name" : "marathon-user",
    "ha" : true,
    "hostname" : "stringValue",
    "http-address" : "stringValue",
    "http-credentials" : "stringValue",
    "http-endpoints" : "stringValue",
    "http-event-callback-slow-consumer-timeout" : 10000,
    "http-max-concurrent-requests" : 10,
    "http-port" : 0,
    "http-realm" : "Mesosphere",
    "https-address" : "stringValue",
    "https-port" : 0,
    "launch-token-refresh-interval" : 30000,
    "launch-tokens" : 100,
    "leader-proxy-connection-timeout" : 5000,
    "leader-proxy-read-timeout" : 10000,
    "local-port-max" : 20000,
    "local-port-min" : 10000,
    "logging-level" : "stringValue",
    "marathon-store-timeout" : 10,
    "master" : "stringValue",
    "max-apps" : 10,
    "max-tasks-per-offer" : 1,
    "mesos-authentication-principal" : "stringValue",
    "mesos-authentication-secret-file" : "stringValue",
    "mesos-leader-ui-url" : "/mesos",
    "mesos-role" : "stringValue",
    "mesos-user" : "stringValue",
    "metrics" : true,
    "min-revive-offers-interval" : 5000,
    "offer-matching-timeout" : 1000,
    "on-elected-prepare-timeout" : 1800000,
    "plugin-conf" : "stringValue",
    "plugin-dir" : "stringValue",
    "reconciliation-initial-delay" : 15000,
    "reconciliation-interval" : 600000,
    "reporter-datadog" : "stringValue",
    "reporter-graphite" : "stringValue",
    "revive-offers-repetitions" : 3,
    "save-tasks-to-launch-timeout" : 3000,
    "scale-apps-initial-delay" : 15000,
    "scale-apps-interval" : 300000,
    "ssl-keystore-password" : "stringValue",
    "ssl-keystore-path" : "stringValue",
    "store-cache" : true,
    "task-launch-confirm-timeout" : 300000,
    "task-launch-timeout" : 300000,
    "tracing" : false,
    "webui-url" : "stringValue",
    "zk" : "stringValue",
    "zk-compression" : true,
    "zk-compression-threshold" : 65536,
    "zk-max-versions" : 25,
    "zk-session-timeout" : 10000,
    "zk-timeout" : 10000
  }
}
