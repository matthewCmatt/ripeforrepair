package main

import (
	"fmt"
	"log"
	"os"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

type AppState struct {
	pb             *pocketbase.PocketBase
	BUILD_HOOK_URL string
}

func main() {
	BUILD_HOOK_URL, found := os.LookupEnv("BUILD_HOOK_URL")
	if !found {
		fmt.Printf("Environment variable BUILD_HOOK_URL not found")
		os.Exit(1)
	}

	app := pocketbase.New()

	state := AppState{pb: app, BUILD_HOOK_URL: BUILD_HOOK_URL}

	app.OnRecordCreate("events").BindFunc(func(e *core.RecordEvent) error {
		Rebuild(state)
		return e.Next()
	})

	app.OnRecordUpdate("events").BindFunc(func(e *core.RecordEvent) error {
		Rebuild(state)
		return e.Next()
	})

	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		se.Router.GET("/{path...}", apis.Static(os.DirFS("./pb_public"), false))
		return se.Next()
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
