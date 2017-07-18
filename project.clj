(defproject api "0.1.0-SNAPSHOT"
  :description "App showing private investments"
  ;:url "http://example.com/FIXME"
  :dependencies [[org.clojure/clojure "1.8.0"]]
  :main ^:skip-aot api.core
  :target-path "target/%s"
  :profiles {:uberjar {:aot :all}})
