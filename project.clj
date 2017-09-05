(defproject api "0.1.0-SNAPSHOT"
  :description "App showing private investments"
  ;:url "http://example.com/FIXME"
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [ring/ring-core "1.6.2"]
                 [ring/ring-jetty-adapter "1.6.2"]
                 [ring/ring-json "0.4.0"]
                 [compojure "1.6.0"]
                 [org.clojure/data.csv "0.1.4"]
                 ]
  :plugins [[lein-shell "0.5.0"]]
  :main ^:skip-aot api.core
  :target-path "target/%s"
  :profiles {:uberjar {:aot :all
                       :prep-tasks ["compile" ["shell" "npm" "run-script" "build"]]}})
