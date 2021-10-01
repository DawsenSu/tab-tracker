using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace HttpClient
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var client = new System.Net.Http.HttpClient();

            var content = await client.GetStringAsync("http://localhost:8081/songs/2");

            Console.WriteLine(content);
        }
    }
}
