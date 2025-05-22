import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CreateQuizPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setMessage("");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload-quiz-csv", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setMessage("Quiz generated and saved successfully!");
      } else {
        setMessage("Failed to generate quiz. Please check your document format.");
      }
    } catch (err) {
      setMessage("Error uploading file.");
    }
    setUploading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Create Quiz from Excel Template</CardTitle>
        </CardHeader>
        <CardContent>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="mb-4"
          />
          <Button onClick={handleUpload} disabled={!file || uploading} className="w-full mb-2">
            {uploading ? "Uploading..." : "Upload and Generate Quiz"}
          </Button>
          {message && <div className="text-center mt-2 text-sm text-quiz-primary">{message}</div>}
          <div className="mt-4 text-xs text-gray-500">
            Upload a CSV file generated from our Excel template. The system will parse the rows and save them as a quiz.
          </div>
          <a
            href="/quiz_template.csv"
            download
            className="block mt-2 text-xs text-quiz-primary underline text-center"
          >
            Download sample template
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateQuizPage;
