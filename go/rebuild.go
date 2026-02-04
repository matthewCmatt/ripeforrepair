package main

import (
	"fmt"
	"net/http"
	"os"
)

func Rebuild(state AppState) error {
	client := &http.Client{}

	req, err := http.NewRequest("POST", state.BUILD_HOOK_URL, nil)
	if err != nil {
		fmt.Printf("Error creating request: %s\n", err)
		os.Exit(1)
	}

	resp, err := client.Do(req)
	if err != nil {
		fmt.Printf("Error sending request: %s\n", err)
		os.Exit(1)
	}
	defer resp.Body.Close()

	// Check the response status code
	if resp.StatusCode == http.StatusNoContent || resp.StatusCode == http.StatusOK {
		fmt.Println("Netlify deploy triggered successfully!")
	} else {
		fmt.Printf("Failed to trigger deploy. Status code: %d\n", resp.StatusCode)
	}

	return nil
}
