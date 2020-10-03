using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TimeCatch.Models
{
    public class TimeRegistration
    {
        public int Id { get; set; }

        public DateTime TimeFrom { get; set; }

        public DateTime TimeTo { get; set; }

        public int ClientId { get; set; }

       }
    
}
