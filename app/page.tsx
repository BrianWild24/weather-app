            Real-time weather information for Dallas, Texas
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1 italic">
            Data refreshes when you click Refresh
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
            <p className="text-red-800 dark:text-red-200">{error}</p>