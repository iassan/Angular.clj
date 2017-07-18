(ns api.core
  (:gen-class)
  (:require [ring.adapter.jetty :as j]))

(defn handler [request]
  {:status 200
   :headers {"Content-type" "text/html"}
   :body "Hello, World!"})

(defn -main
  [& args]
  (j/run-jetty handler {:port 3000}))
