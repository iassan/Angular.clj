(ns api.core
  (:gen-class)
  (:require [ring.adapter.jetty :as j]
            [ring.middleware.resource :as r]))

(defn handler [request]
  {:status 200
   :headers {"Content-type" "text/html"}
   :body "Hello, World!"})

(def app
  (r/wrap-resource handler "public"))

(defn -main
  [& args]
  (j/run-jetty app {:port 3000}))
