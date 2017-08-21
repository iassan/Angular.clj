(ns api.core
  (:gen-class)
  (:require [ring.adapter.jetty :as jetty]
            [ring.middleware.resource :as resource]
            [compojure.core :refer :all]
            [ring.middleware.json :refer [wrap-json-response]]
            [ring.util.response :refer :all]))

(defn staticHandler [request]
  (content-type (response "Hello, World!") "text/html"))

(defn jsonHandler [request]
  (response {:message "Hello, JSON!"}))

(defroutes my-routes
           (GET "/hello" [] staticHandler)
           (GET "/json" [] (wrap-json-response jsonHandler)))

(def app
  (resource/wrap-resource my-routes "public"))

(defn -main
  [& args]
  (jetty/run-jetty app {:port 3000}))
